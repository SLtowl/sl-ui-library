// Read onChange(checked) to save the task.
SLTask.mount(document.querySelector('.pb-task'), {
  onChange: checked => { saveTask(checked); },
});
