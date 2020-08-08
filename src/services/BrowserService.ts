export class BrowserService {
    public static reloadTab(tabId: number) {
        chrome.tabs.reload(tabId);
    }

    public static getCurrentTabId(callback: (tabId: number | undefined, tabDetails: any) => void) {
        chrome.tabs.query({
            active: true, currentWindow: true
        }, (foundTabs) => {
            let currentTab = foundTabs[0] || {};
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

    public static executeCodeInTab(tabId: number, scriptToBeExecuted: string, callback?: any) {
        chrome.tabs.executeScript(tabId, {
            code: scriptToBeExecuted
        }, (results) => {
            if (chrome.runtime.lastError) {
                // catching the error
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

    /**
     * After installing the chrome extension,
     * we should close the chrome webstore and reload the intent page.
     */
    public static executeInstallationFlow() {
        chrome.tabs.query({url: 'https://go.userlane.com/*'}, tabs => {
            if (tabs.length > 0) {

                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.update(tabs[0].id, {active: true}, () => {
                    });
                    BrowserService.reloadTab(tabs[0].id);
                    chrome.tabs.query({url: 'https://chrome.google.com/webstore/detail/bontrip-extension/*'}, chromeStoreTabs => {
                        if (chromeStoreTabs.length > 0 && chromeStoreTabs[0].id) {
                            chrome.tabs.remove(chromeStoreTabs[0].id);
                        }
                    });
                }
            }
        })
    }

    public static sendMessageToTab(tabId: number, message: any, responseCallback?: (response: any) => void) {
        chrome.tabs.sendMessage(tabId, message, responseCallback);
    }

    public static createTab(url: string, active: boolean = false) {
        chrome.tabs.create({
            url,
            active
        });
    }

    public static closeTab(tabId: number) {
        chrome.tabs.remove(tabId);
    }
}
