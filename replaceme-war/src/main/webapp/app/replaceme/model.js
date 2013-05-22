/*jslint browser : true, continue : true,
         devel : true, indent : 2, maxerr : 50,
         newcap : true, nomen : true, plusplus : true,
         regexp : true, sloppy : true, vars : false,
         white : false
*/
/*global namespace, replaceme*/

namespace('replaceme.model');


replaceme.model.ToDo = function (data) {

    var id,
        subject,
        whatToDo;

    if (data) {
        id = data.id;
        subject = data.subject;
        whatToDo = data.whatToDo;
    }

    return {
        id: id,
        subject: subject,
        whatToDo: whatToDo
    };

};