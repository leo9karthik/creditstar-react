const gs = {
    showLoader: (status) => {
        // console.log(status);
        let elem = document.getElementsByClassName('loaderBig');
        // document.getElementById('loaderImg').src = './img/loader.gif';

        if (elem) {
            // console.log(status);
            if (status) {
                // console.log('Loader Show..');
                elem[0].classList.add("show");
            } else {
                // console.log('Loader Hide..');
                elem[0].classList.remove("show");
            }
        }
    },
};


export default gs;
