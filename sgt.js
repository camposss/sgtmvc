
class StudentContentManagementSystem{
    constructor(sgtOptions){
        this.model = new SCMS_model();
        this.view = new SCMS_view(sgtOptions, this);
    }
    initialize(){
        this.view.initialize();
    }
    handleAddStudent(name, course, grade){
        console.log(`SGT CONTROLLER GOT DATA: ${name}, ${course}, ${grade}`);
    }
}

class SCMS_view{
    constructor(viewOptions, parent){
        this.parent = parent;
        this.interfaceElements = {};
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

        this.parent.handleAddStudent(name, course, grade);
    }
    handleCancelClick(){
        console.log('clear button was clicked');
    }

}

class SCMS_model{
    constructor(){

    }
}