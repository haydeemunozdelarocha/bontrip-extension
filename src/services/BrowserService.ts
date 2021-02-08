import {Logger} from "../tools/Logger";

export class BrowserService {
    public static reloadTab(tabId: number) {
        chrome.tabs.reload(tabId);
    }

    public static getCurrentTabId(callback: (tabId: number | undefined, tabDetails: any) => void) {
        chrome.tabs.query({
            active: true, currentWindow: true
        }, (foundTabs) => {
            const currentTab = foundTabs[0] || {};
            callback(currentTab.id, currentTab);
        })
    }

    public static onTabCompletedLoading(callback: (tabId: number, changeInfo: any, tab: any) => void) {
        chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: any, tab: any) => {
            if (changeInfo.status == 'complete') {
                callback(tabId, changeInfo, tab);
            }
        });
    }

    public static executeCodeInTab(tabId: number, scriptToBeExecuted: any, callback?: any, params?: any[]) {
        Logger.log('PARAMS', params && params.length ? params.join(',') : '')
        chrome.tabs.executeScript(tabId, {
            code: `(${scriptToBeExecuted})("${params && params.length ? params.join(',') : ''}")`
        }, (results) => {
            if (chrome.runtime.lastError) {
                Logger.error('Error: ', chrome.runtime.lastError)
            }

            if (callback) {
                callback(results);
            }
        });
    }

    public static onTabCreated(callback: (tabId: number, tabDetails: any) => void) {
        chrome.tabs.onCreated.addListener((tab: any) => {
            callback(tab.id, tab);
        });
    }

    public static onTabDestroyed(callback: (tabId: number) => void) {
        chrome.tabs.onRemoved.addListener((tabId: number) => {
            callback(tabId);
        });
    }

    public static onReceiveInternalMessage(callback: (message: any, sender: any, responseCallback: (message: any) => void) => void) {
        console.log('received internal message');
        chrome.runtime.onMessage.addListener(callback);
    }

    public static onExtensionInstalled(callback: () => void) {
        chrome.runtime.onInstalled.addListener(callback);
    }

    public static sendMessageToTab(tabId: number, message: any, responseCallback?: (response: any) => void) {
        chrome.tabs.sendMessage(tabId, message, responseCallback);
    }

    public static createTab(url: string, active: boolean) {
        chrome.tabs.create({
            url,
            active
        });
    }

    public static closeTab(tabId: number) {
        chrome.tabs.remove(tabId);
    }
}
