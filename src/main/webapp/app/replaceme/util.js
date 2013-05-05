/**
 * Utility method that creates or reuses namespaces for use in the Javascript module pattern.
 * Sets the created namespace in the window scope
 *
 * @param namespaceString - A namespace on the form 'myCompany.myModule.myDomain' or just 'myCompany'
 * @returns {*|window|window}
 */
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';

    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
}
