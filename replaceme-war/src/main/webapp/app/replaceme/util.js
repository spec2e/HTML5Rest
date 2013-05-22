/*jslint browser : true, continue : true,
         devel : true, indent : 2, maxerr : 50,
         newcap : true, nomen : true, plusplus : true,
         regexp : true, sloppy : true, vars : false,
         white : false
*/
/*global window, angular*/

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
        currentPart = ''
        ;

    angular.forEach(parts, function(value, key) {
        currentPart = value;
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    });    

    return parent;
}


function log(message) {
    if (typeof(console) !== 'undefined' && console !== null) {
        console.log(message);
    }
}
