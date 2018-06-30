import 'plugins/kibana-html-plugin/html.less';
import mainTemplate from 'plugins/kibana-html-plugin/html.html';
import optionsTemplate from 'plugins/kibana-html-plugin/htmlOptions.html';
import 'plugins/kibana-html-plugin/htmlController.js';

import 'plugins/kibana-html-plugin/deps/ace-builds/ace.js';
import 'plugins/kibana-html-plugin/deps/ace-builds/mode-html.js';
import 'plugins/kibana-html-plugin/deps/ace-builds/theme-monokai.js';
import 'plugins/kibana-html-plugin/deps/angular-ui-ace/ui-ace.min.js';

import {CATEGORY} from 'ui/vis/vis_category';
import {VisFactoryProvider} from 'ui/vis/vis_factory';
import {VisTypesRegistryProvider} from 'ui/registry/vis_types';
import {VisSchemasProvider} from 'ui/vis/editors/default/schemas';
import { DefaultEditorSize } from 'ui/vis/editor_size';

VisTypesRegistryProvider.register(HtmlVisProvider);

function HtmlVisProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createAngularVisualization({
    name: 'html',
    title: 'Html widget',
    isAccessible: true,
    icon: 'fa-code',
    description: 'Useful for displaying html in dashboards.',
    category: CATEGORY.OTHER,
    visConfig: {
      template: mainTemplate
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
      enableAutoApply: true,
      defaultSize: DefaultEditorSize.LARGE
    },
    options: {
      showTimePicker: false,
    },
    requestHandler: 'none',
    responseHandler: 'none'
  });
}
