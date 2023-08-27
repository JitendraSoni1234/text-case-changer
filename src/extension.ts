import * as vscode from 'vscode';

function capitalizeText(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toLowerCase(text: string): string {
  return text.toLowerCase();
}

function toUpperCase(text: string): string {
  return text.toUpperCase();
}

function toCamelCase(text: string): string {
  const words = text.split(' ');
  const camelCaseWords = words.map((word, index) => (index === 0 ? word.toLowerCase() : capitalizeText(word)));
  return camelCaseWords.join('');
}

function toSnakeCase(text: string): string {
  return text.replace(/\s+/g, '_').toLowerCase();
}

export function activate(context: vscode.ExtensionContext) {
  const functionalities = [
    { name: 'uppercase', method: toUpperCase },
    { name: 'lowercase', method: toLowerCase },
    { name: 'camelcase', method: toCamelCase },
    { name: 'snakecase', method: toSnakeCase },
    { name: 'capitalize', method: capitalizeText },
  ];
  functionalities?.forEach(functionality => {
    let disposable = vscode.commands.registerCommand(`text-case-changer.${functionality?.name}`, () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selections = editor.selections;
        editor.edit(editBuilder => {
          selections.forEach(selection => {
            const selectedText = editor.document.getText(selection);
            const capitalizedText = functionality?.method(selectedText);
            editBuilder.replace(selection, capitalizedText);
          });
        });
      }
      context.subscriptions.push(disposable);
    });
  });
}

export function deactivate() {}
