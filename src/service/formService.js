const formService = {

    inputEmptyCheck() {
        // console.log('input empty check Init');
        /* Form Fielf Empty Check */
        function RemoveClass(elem, newClass) {
            elem.className = elem.className.replace(newClass, '')
        }

        var elems = document.querySelectorAll('.form-field');
        [].forEach.call(elems, function (elem) {
            if (elem.value !== '') {
                if (!elem.classList.contains("field--not-empty")) {
                    elem.className += " field--not-empty";
                }
            }

            elem.addEventListener('input', function () {
                // console.log(this.value);
                if (this.value !== '') {
                    if (!this.classList.contains("field--not-empty")) {
                        this.className += " field--not-empty";
                    }
                } else {
                    RemoveClass(this, " field--not-empty")
                }
            });
        });
        /* Form Fielf Empty Check Ends */
    },

    // inputEmptyCheck() {
    //     console.log('input empty check');
    //     /* Form Fielf Empty Check */
    //     var elems = document.querySelectorAll('.form-field');
    //     [].forEach.call(elems, function (elem) {
    //         if (elem.value != '') {
    //             elem.className += " field--not-empty";
    //         }
    //     });
    //     /* Form Fielf Empty Check Ends */
    // },

    apiDelay() {
        return 2000;
    },
};

export default formService;
