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