
class StudentContentManagementSystem{
    constructor(sgtOptions){
        this.model = new SCMS_model();
        const viewCallbacks = {
            add: this.handleAddStudent.bind(this),
            cancel: this.handleCancelStudent.bind(this)
        }
        this.view = new SCMS_view(sgtOptions, viewCallbacks);
    }
    initialize(){
        this.view.initialize();
        const students = this.model.getAllStudents();
        this.view.renderAllStudents(students);
    }
    handleAddStudent(name, course, grade){
        console.log(`SGT CONTROLLER GOT DATA: ${name}, ${course}, ${grade}`);
        if(typeof name !== 'string' || name.length===0){
            this.view.displayMessage('Name must be specified');
            return;
        }
        if(typeof course !== 'string' || course.length===0){
            this.view.displayMessage('course must be specified');
            return;
        }
        if(isNaN(grade) || grade <0 || grade>100){
            this.view.displayMessage('grade must be a number and be between 0 and 100');
            return;
        }
        this.model.addStudent(name, course, grade);
        this.view.renderAllStudents( this.model.getAllStudents() );
    }
    handleCancelStudent(){
        console.log('meh');
    }
}

class SCMS_view{
    constructor(viewOptions, callBacks){
        this.parent = parent;
        this.interfaceElements = {};
        this.callBacks = callBacks;
        const defaultOptions = [
            'addButton', 'cancelButton','nameInput',
            'courseInput', 'gradeInput','studentDisplay'
        ];
        for(var option_i=0; option_i < defaultOptions.length; option_i++){
            if(viewOptions[ defaultOptions[ option_i] ]){
                this.interfaceElements[ defaultOptions[ option_i ] ] = viewOptions[ defaultOptions[ option_i] ];
            } else {
                console.error(`Missing option ${defaultOptions[ option_i ]}: terminating`);
                return false;
            }
        }
    }
    initialize(){ 
        this.attachClickHandlers();
    }
    attachClickHandlers(){
        const eventHandlers = {
            'addButton': this.handleAddClick,
            'cancelButton': this.handleCancelClick
        }
        for(let key in this.interfaceElements){
            let element = $( this.interfaceElements[key] );
            if(element.length){
                this.interfaceElements[key] = element;
                if(eventHandlers[ key ]){
                    element.on('click', eventHandlers[key].bind( this ));
                    //element.on('click', (event)=> this.handleAddClick());
                }
            } else {
                console.error(`Missing element ${this.interfaceElements[key]}: terminating`);
                return false;               
            }
        }
    }
    handleAddClick(){
        console.log('add button was clicked', this);
        const name = this.interfaceElements.nameInput.val();
        const course = this.interfaceElements.courseInput.val();
        const grade = this.interfaceElements.gradeInput.val();
        console.log(`data from click: ${name}, ${course}, ${grade}`);

        //this.parent.handleAddStudent(name, course, grade);
        this.callBacks.add(name, course, grade);
    }
    handleCancelClick(){
        console.log('clear button was clicked');
    }
    displayMessage(message){
        $("#messageDisplay .modal-body").text(message);
        $("#messageDisplay").modal('show');
    }
    renderAllStudents(students){
        
        this.interfaceElements.studentDisplay.empty();
        if(students.length>0){
            const studentElements = students.map( this.renderOneStudent );
            this.interfaceElements.studentDisplay.append(studentElements);
        } else {
            this.interfaceElements.studentDisplay.append("No students available");
        }
    }
    renderOneStudent( singleStudent ){
        const row = $("<tr>");
        const name = $("<td>", {
            text: singleStudent.name
        });
        const course = $("<td>", {
            text: singleStudent.course
        });
        const grade = $("<td>", {
            text: singleStudent.grade
        });
        const operations = $("<td>");
        const deleteButton = $("<button>",{
            text: 'DELETE'
        });
        operations.append(deleteButton);
        row.append(name, course, grade, operations);
        return row;

    }

}

class SCMS_model{
    constructor(){
        this.studentArray = [];
    }
    addStudent(name, course, grade){
        //es5
        // var student = {
        //     name: name,
        //     course: course, 
        //     grade: grade
        // }
        //es6 const with object structuring
        const student = {name, course, grade};
        this.studentArray.push(student);
        return this.studentArray.length
    }
    getAllStudents(){
        return this.studentArray;
    }

}











