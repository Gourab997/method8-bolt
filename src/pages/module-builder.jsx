import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-searchbox';
import { useContext, useEffect, useState } from 'react';
import { SvgRegistry, setLicenseKey } from 'survey-core';
import 'survey-core/survey-core.css';
import {
  editorLocalization,
  getLocaleStrings,
  registerCreatorTheme,
} from 'survey-creator-core';
import 'survey-creator-core/survey-creator-core.css';
import { message } from 'antd';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import {
  useGetModuleQuery,
  useUpdateModuleMutation,
} from '../api/features/module/module-api.js';
import { iconMap } from '../components/common/icon.jsx';
import { MethodEightCreator } from '../components/common/method-eight-creator-theme.js';
import { BreadcrumbContext } from '../context/breadcrumb/breadcrumb-context.js';

const method8Theme = {
  themeName: 'Method8 Theme',
  cssVariables: { ...MethodEightCreator },
};

const enLocale = getLocaleStrings('en');

function addCustomTheme(theme, userFriendlyThemeName) {
  enLocale.creatortheme.names[theme.themeName] = userFriendlyThemeName;
  registerCreatorTheme(theme);
}
addCustomTheme(method8Theme, 'Method8 Theme');

const licenseKey = import.meta.env.VITE_SURVEY_CREATOR_LICENSE_KEY;
const customTranslations = {
  ed: {
    designer: 'Module',
    surveyPlaceholderTitle: 'Your form is empty',
  },
  pe: {
    survey: {
      title: 'Module Title',
      description: 'Module Description',
      readOnly: 'Make the module read-only',
    },
    widthMode: 'Module Width Mode',
    surveyTitlePlaceholder: 'Module Title',
  },
};

setLicenseKey(licenseKey);

const defaultCreatorOptions = {
  showDesignerTab: true,
  showLogicTab: false,
  showTranslationTab: false,
  showJSONEditorTab: false,
  showPreviewTab: false,
  showThemeTab: false,
  autoSaveEnabled: true,
  autoSaveDelay: 1000,
};

const deepMerge = (target, source) => {
  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      const sourceVal = source[key];
      const targetVal = target[key];
      if (
        sourceVal &&
        typeof sourceVal === 'object' &&
        !Array.isArray(sourceVal) &&
        targetVal &&
        typeof targetVal === 'object' &&
        !Array.isArray(targetVal)
      ) {
        deepMerge(targetVal, sourceVal);
      } else {
        target[key] = sourceVal;
      }
    }
  }
};

deepMerge(editorLocalization.getLocale('en'), customTranslations);

for (const iconName in iconMap) {
  if (Object.hasOwn(iconMap, iconName)) {
    SvgRegistry.registerIcon(iconName, iconMap[iconName]);
  }
}

const ModuleBuilder = () => {
  const { module_id } = useParams();
  const [creator] = useState(new SurveyCreator(defaultCreatorOptions));
  const { data: moduleData } = useGetModuleQuery(module_id);
  const [updateModule] = useUpdateModuleMutation();
  const { setItems } = useContext(BreadcrumbContext);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    if (moduleData) {
      const assessmentId = moduleData.data.assessment_module.assessment_id;
      const moduleName = moduleData.data.assessment_module.name;
      setItems([
        {
          title: 'Modules',
          href: `/modules/${assessmentId}`,
        },
        {
          title: moduleName,
        },
      ]);
    }
  }, [moduleData, setItems]);

  useEffect(() => {
    creator.applyCreatorTheme(method8Theme);
    creator.openCreatorThemeSettings();
  }, [creator]);

  useEffect(() => {
    if (moduleData && !initialDataLoaded) {
      creator.JSON = moduleData.data.assessment_module.form_data;
      setInitialDataLoaded(true);
    }
  }, [moduleData, creator, initialDataLoaded]);

  creator.saveSurveyFunc = async (saveNo, callback) => {
    try {
      await updateModule({
        id: module_id,
        form_data: creator.JSON,
      }).unwrap();
      callback(saveNo, true);
      message.success('Module updated successfully');
    } catch (_error) {
      callback(saveNo, false);
      message.error('Failed to update module');
    }
  };

  return (
    <>
      <Helmet>
        <title>{moduleData?.data?.assessment_module?.name}</title>
      </Helmet>
      <div
        style={{
          flex: '1 1 auto',
          position: 'relative',
          margin: '-12px -24px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            visibility: 'visible',
          }}
        >
          <SurveyCreatorComponent creator={creator} />
        </div>
      </div>
    </>
  );
};

export default ModuleBuilder;
