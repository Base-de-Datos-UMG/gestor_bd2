var textareaForm = document.getElementById("querys");

textareaForm.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }

    if (event.ctrlKey && event.keyCode === 13) {
        event.preventDefault();  // Evita el salto de línea en el textarea
        document.getElementById('form-query').submit();  // Envía el formulario
    }
});