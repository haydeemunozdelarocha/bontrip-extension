export class Logger {
    public static log(message: string, value: any = '') {
        const backgroundPageLogger = (chrome.extension.getBackgroundPage() as any)?.console?.log;

        if (backgroundPageLogger) {
            backgroundPageLogger(message, value);
        }
    }

    public static error(message: string, value: any = '') {
        const backgroundPageLogger = (chrome.extension.getBackgroundPage() as any)?.console?.error;

        if (backgroundPageLogger) {
            backgroundPageLogger(message, value);
        }
    }
}
