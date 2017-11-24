const bindOptions = {
    addButton: "#addButton",
    cancelButton: "#cancelButton",
    nameInput: "#studentName",
    courseInput: "#studentCourse",
    gradeInput: "#studentGrade",
    studentDisplay: "#studentDisplay"
}

const sgt = new StudentContentManagementSystem({});

$(document).ready(function () {

});

function StudentContentManagementSystem(bindOptions){
    this.model = new SCMS_model();
    this.view = new SCMS_view(sgtOptions);
}

function SCMS_view(viewOptions){
        const defaultOptions = [
            'addButton', 'cancelButton','nameInput',
            'courseInput', 'gradeInput','studentDisplay'
        ];
}

function SCMS_model(){

}