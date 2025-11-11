import { normalizePath, getWorkspacePath } from '@/utils';
import { NEURO } from '@/constants';
import {
    initializeCommonState,
    setupCommonProviders,
    registerCommonCommands,
    setupCommonEventHandlers,
    setupClientConnectedHandlers,
    reloadPermissions,
    showUpdateReminder,
} from '@shared/extension';
import { registerSendSelectionToNeuro } from '@/editing';
import { loadIgnoreFiles } from '@/ignore_utils';

export function activate(context: vscode.ExtensionContext, addUnsupervisedActions: function, reloadPermissions: function) {
    loadIgnoreFiles( // Load initial contents to ignore
        normalizePath( // Provide the workspace path to the function
            getWorkspacePath() || '',
        ) || '',
    );

    // Initialize common state
    initializeCommonState(context);

    // Show update reminder if version changed
    showUpdateReminder(context);

    vscode.commands.registerCommand('neuropilot.reloadPermissions', reloadPermissions);

    // Add actions to the registry
    addUnsupervisedActions();

    // Setup providers
    NEURO.context!.subscriptions.push(...setupCommonProviders());

    // Register commands
    NEURO.context!.subscriptions.push(...registerCommonCommands());

    // Setup event handlers
    NEURO.context!.subscriptions.push(...setupCommonEventHandlers());
}
