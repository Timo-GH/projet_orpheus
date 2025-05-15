document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const dynamicFormContainer = document.getElementById('dynamic-form-container');
    const profilContainer = document.querySelector('.profil-container');

    // Gestion de la soumission des formulaires
    const submitForm = async () => {
        console.log("Submit Formulaire");
        const form = document.querySelector('#form-profil'); 
        console.log(form);

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formType = form.getAttribute('data-form-type');
                console.log('Type de formulaire :', formType);
                const mainData = form.querySelector('#main-field').value.trim();
                console.log('Valeur principale :', mainData);

                const confirmField = form.querySelector('#confirm-field');
                if (confirmField) {
                    const confirmData = confirmField.value.trim();
                    if (mainData !== confirmData) {
                        console.error('Les champs ne correspondent pas');
                        // Afficher un message d'erreur sur la vue
                        alert('Erreur : Les champs de confirmation ne correspondent pas.');
                        return;
                    }
                };

                const formData = {
                    type: formType,
                    data: mainData,
                };
                console.log('Données du formulaire :', formData);

                const response = await fetch('/update-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),                    
                });
                console.log(body);

                const result = await response.json();

                if (response.ok) {
                    console.log('Mise à jour réussie :', result);
                } else {
                    console.error('Erreur lors de la requête :', response.status);
                    console.error('Erreur lors de la mise à jour :', result);
                }
            });
        } else {
            console.log('Formulaire non trouvé');
        }
    }

    // Fonction pour afficher dynamiquement un formulaire
    const openForm = (formId) => {
        // Charger dynamiquement le formulaire via fetch
        fetch(`/forms_profil/${formId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du formulaire');
                }
                return response.text(); // Récupérer le HTML du formulaire
            })
            .then((html) => {
                dynamicFormContainer.innerHTML = html; // Injecter le HTML dans le conteneur
                dynamicFormContainer.classList.remove('d-none');
                dynamicFormContainer.classList.add('d-block');
                body.style.overflow = 'hidden'; // Désactiver le scroll en arrière-plan
                profilContainer.style.filter = 'blur(5px)';
            })
            .then(() => {
                submitForm(); // Appeler la fonction submitForm
            })
            .catch((error) => {
                console.error('Erreur :', error);
            });
    };

    // Récupérer les boutons de modification
    const modifyButtons = document.querySelectorAll("[data-form]");
    modifyButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const formId = event.currentTarget.getAttribute("data-form");
            openForm(formId); // Appeler openForm avec l'ID du formulaire
        });
    });

    // Fonction pour fermer un formulaire
    const closeForm = (formContainer) => {
        formContainer.classList.add("d-none");
        formContainer.classList.remove("d-block");
        body.style.overflow = ""; // Réactiver le scroll
        profilContainer.style.filter = 'none';
    };


    // Gestion de la fermeture des formulaires
    document.addEventListener("click", (e) => {
        const openForms = document.querySelectorAll(".modal.d-block");
        openForms.forEach((formContainer) => {
        if (e.target === formContainer || e.target.classList.contains("btn-danger") || e.target.classList.contains("btn-primary") ) { //
            closeForm(formContainer);
        }
        });
    });
});