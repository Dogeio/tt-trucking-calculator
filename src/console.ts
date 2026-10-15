import state from './state.js';

function initConsole() {
    const consoleContent = document.querySelector('.console-content')!;
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info
    };

    // Initialize console visibility based on saved state
    const isConsoleVisible = localStorage.getItem('consoleVisible') === 'true';
    const consoleContainer = document.getElementById('console-container');
    if (consoleContainer) {
        consoleContainer.classList.toggle('hidden', !isConsoleVisible);
    }

    const filterButtons = document.querySelectorAll('.console-filter') as NodeListOf<HTMLButtonElement>;
    const savedFilter = localStorage.getItem('consoleFilter') || state.DEFAULT_CONSOLE_FILTER;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((btn) => btn.classList.remove('active'));

            button.classList.add('active');

            const filterType = button.getAttribute('data-type') ?? 'all';

            consoleContent.classList.remove('filter-log', 'filter-info', 'filter-warn', 'filter-error');

            if (filterType !== 'all') {
                consoleContent.classList.add(`filter-${filterType}`);
            }

            localStorage.setItem('consoleFilter', filterType);
        });

        if (button.getAttribute('data-type') === savedFilter) {
            button.click();
        }
    });

    function addLogEntry(type: 'log' | 'info' | 'warn' | 'error', args: IArguments | any[]) {
        if (!consoleContent) return;

        const entry = document.createElement('div');
        entry.className = type;

        const timestamp = new Date().toLocaleTimeString();
        const message = Array.from(args)
            .map((arg) => {
                if (arg instanceof Error) {
                    return `${arg.message}\n${arg.stack}`;
                }
                return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            })
            .join(' ');

        const timestampElement = document.createElement('span');
        timestampElement.className = 'timestamp';
        timestampElement.textContent = `[${timestamp}]`;
        entry.append(timestampElement, document.createTextNode(` ${message}`));
        consoleContent.appendChild(entry);

        consoleContent.scrollTop = consoleContent.scrollHeight;

        state.logs.push(entry);
        if (state.logs.length > state.MAX_LOGS) {
            const removed = state.logs.shift();
            if (removed && removed.parentNode) {
                removed.parentNode.removeChild(removed);
            }
        }
    }

    console.log = function () {
        addLogEntry('log', arguments);
        originalConsole.log.apply(console, arguments as any);
    };

    console.warn = function () {
        addLogEntry('warn', arguments);
        originalConsole.warn.apply(console, arguments as any);
    };

    console.error = function () {
        addLogEntry('error', arguments);
        originalConsole.error.apply(console, arguments as any);
    };

    console.info = function () {
        addLogEntry('info', arguments);
        originalConsole.info.apply(console, arguments as any);
    };

    window.onerror = function (message, source, lineno, colno, error) {
        const errorInfo = [`Error: ${message}`, `at ${source}:${lineno}:${colno}`, error ? error.stack : ''];
        addLogEntry('error', errorInfo);
        return false;
    };

    window.addEventListener('unhandledrejection', function (event) {
        const errorInfo = ['Unhandled Promise Rejection:', event.reason];
        addLogEntry('error', errorInfo);
    });

    // Set up code execution functionality
    const codeInput = document.getElementById('console-code-input');
    if (codeInput) {
        codeInput.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                executeConsoleCode();
            }
        });
    }

    console.info('Console initialized');
}

function toggleConsole() {
    const consoleContainer = document.getElementById('console-container')!;
    const isVisible = !consoleContainer.classList.toggle('hidden');

    // Save visibility state to localStorage
    localStorage.setItem('consoleVisible', isVisible ? 'true' : 'false');
}

function clearConsole() {
    const consoleContent = document.querySelector('.console-content')!;
    while (consoleContent.firstChild) {
        consoleContent.removeChild(consoleContent.firstChild);
    }
    state.logs.length = 0;
}

function executeConsoleCode() {
    const codeInput = document.getElementById('console-code-input') as HTMLInputElement;
    const code = codeInput.value.trim();

    if (!code) return;

    console.log(`> ${code}`);

    try {
        // Create a module URL from the code
        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        // Use dynamic import instead of eval
        import(url)
            .then((module) => {
                if (module.default !== undefined) {
                    console.log('< ', module.default);
                } else {
                    const exports = Object.keys(module);
                    if (exports.length > 0) {
                        console.log('< Exported:', exports.join(', '));
                        exports.forEach((key) => {
                            console.log(`< ${key}:`, module[key]);
                        });
                    }
                }

                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
                URL.revokeObjectURL(url);
            });
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }

    // Keep the code in the input but select it all for easy replacement
    codeInput.select();
}

(window as any).toggleConsole = toggleConsole;
(window as any).clearConsole = clearConsole;
(window as any).executeConsoleCode = executeConsoleCode;

initConsole();
