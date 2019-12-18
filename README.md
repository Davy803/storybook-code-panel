# storybook-code-panel
Storybook Addon to display code related to a story.  Framework agnostic


## Example

![Example showing plugin in action](/screenshots/example.gif?raw=true)

## Getting Started

Install the plugin into your project

`npm install storybook-code-panel --save`

Register it in your `addons.js` file in your Storybook config directory

`import 'storybook-code-panel/register'`

## Configuring

Set global settings in your `config.js` file in your Storybook config directory

``` js

    import { addParameters } from '@storybook/html'; // Replace `html` with your framework (e.g) react, vue, etc

    addParameters({
        storybookCodePanel: {
            // Disable by default, enable per story
            disabled: true,
            // For file extensions that don't match Prism language name, map file extension to language
            // See list at: https://prismjs.com/#languages-list
            extensionMapping: {
                hbs: 'handlebars'
            },
            // Optional, when auto-adding files specify allowed file extensions and the order to display
            allowedExtensions: [
                'hbs', 'scss', 'css','js', 'json'
            ]
        }
    });
```

In your stories

### Using `createParams` 
The `createParams` method can be used to automatically load file list

It takes of parameter of a Webpack context to find the files.

For example, `require.context('!!raw-loader!../', false, /^((?!stories).)*$/)` 
will load all files in the parent directory (`../`), without subdirectories, and excluding filenames containing "stories".  
They will also be loaded using the `raw-loader` (prefixed with `raw-loader!`) ignoring all other webpack loaders (with the `!!` prefix).

#### Component Story Format (CSF)


``` js
import storybookCodePanel from 'storybook-code-panel';

export default {
    title: 'Elements|Simple/Button',
    parameters: {
        storybookCodePanel: storybookCodePanel.createParams(require.context('!!raw-loader!../', false, /^((?!stories).)*$/))
    }
};
 
```

#### storiesOf API

``` js
import { storiesOf } from '@storybook/html'; // Replace `html` with your framework (e.g) react, vue, etc
import storybookCodePanel from 'storybook-code-panel';

storiesOf('Elements|Simple/Button', module)
    .addParameters({
        storybookCodePanel: storybookCodePanel.createParams(require.context('!!raw-loader!../', false, /^((?!stories).)*$/))
    });
```

### With explicit params
The parameters can also be specified manually 

#### Component Story Format (CSF)


``` js
import storybookCodePanel from 'storybook-code-panel';

export default {
    title: 'Elements|Simple/Button',
    parameters: {
        storybookCodePanel: {
            disabled: false,
            files: [
                {
                    fileName: 'button.hbs',
                    // Not needed if file extension was mapped globally, or file extension matches Prism language key
                    language: 'handlebars',
                    code: require('!!raw-loader!../button.hbs')
                },
                {
                    fileName: '_button.scss',
                    code: require('!!raw-loader!../button.scss')
                },
            ]
        }
    }
};
 
```

#### storiesOf API format

``` js
import { storiesOf } from '@storybook/html'; // Replace `html` with your framework (e.g) react, vue, etc
import storybookCodePanel from 'storybook-code-panel';

storiesOf('Elements|Simple/Button', module)
    .addParameters({
        storybookCodePanel: {
            disabled: false,
            files: [
                {
                    fileName: 'button.hbs',
                    // Not needed if file extension was mapped globally, or file extension matches Prism language key
                    language: 'handlebars',
                    code: require('!!raw-loader!../button.hbs')
                },
                {
                    fileName: '_button.scss',
                    code: require('!!raw-loader!../button.scss')
                },
            ]
        }
    });
```