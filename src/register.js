import React from "react";
import { AddonPanel } from "@storybook/components";
import { addons, types } from "@storybook/addons";
import { useParameter, useAddonState } from '@storybook/api';

import { ADDON_ID, PARAM_KEY, PANEL_ID } from './constants';

import MyPanel from './panel';


addons.register(ADDON_ID, api => {
    
    const render = ({ active, key }) => {
        const p = useParameter(PARAM_KEY, null);

        if (p === null) {
            return null;
        }

        return (<AddonPanel active={active} key={key}>
            <MyPanel />
        </AddonPanel>);
    };
    const title = 'Code';

    addons.add(PANEL_ID, {
        type: types.PANEL,
        title,
        render,
        paramKey: PARAM_KEY,
    });
});
