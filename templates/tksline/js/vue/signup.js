new Vue({
	el: "#register",

	delimiters: ["{_", "_}"],

	data: {
		isCompagnia: false,
		errorsRegister: [],
		submitRegister: false,
		firstSubmit: false,
		formRegister: {
			cognome: null,
			nome: null,
			indirizzo: null,
			telefono: null,
			email: null,
			citta: null,
			cap: null,
			compagnia: null,
			termini: false,
			azienda: {
				nome: null,
				iva: null,
			},
		},
	},

	methods: {
		checkFormRegister: function (e) {
			if (e) {
				e.preventDefault();
			}
			if (this.firstSubmit === true) {
				this.errorsRegister = [];
				if (!this.formRegister.nome) {
					this.errorsRegister.push("Inserisci il tuo nome perfavore");
					this.submitRegister = false;
				}
				if (!this.formRegister.cognome) {
					this.errorsRegister.push("Inserisci il tuo cognome perfavore.");
					this.submitRegister = false;
				}
				if (!this.formRegister.telefono) {
					this.errorsRegister.push(
						"Inserisci un numero di telefono perfavore."
					);
					this.submitRegister = false;
				}
				if (!this.validEmail(this.formRegister.email)) {
					this.errorsRegister.push("Inserisci una email valida perfavore.");
					this.submitRegister = false;
				}
				if (!this.validPassword(this.formRegister.password)) {
					this.errorsRegister.push(
						"Password invalida, assicurati che abbia almeno 1 numero, 1 lettera capitale e che sia lunga almeno 6 caratteri"
					);
					this.submitRegister = false;
				}
				if (!this.formRegister.indirizzo) {
					this.errorsRegister.push("Inserisci il tuo indirizzo perfavore.");
					this.submitRegister = false;
				}
				if (!this.formRegister.citta) {
					this.errorsRegister.push("La tua citta perfavore.");
					this.submitRegister = false;
				}
				if (!this.formRegister.cap) {
					this.errorsRegister.push("Inserisci un cap valido");
					this.submitRegister = false;
				}
				if (this.formRegister.termini === false) {
					this.errorsRegister.push(
						" Assicurati di accettare i termini e le condizioni di utilizzo"
					);
					this.submitRegister = false;
				}
				if (!this.errorsRegister.length) {
					// fetch user data and disappear blocks
					console.log("success");
				}
			}
		},
		validPassword: function (email) {
			var re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$/;
			return re.test(email);
		},
		validEmail: function (email) {
			var re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
	},
	created: function () {
		window.addEventListener("mousemove", () => {
			var forms = document.getElementsByClassName(
				"needs-validation-registrati"
			);
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function (form) {
				form.addEventListener(
					"submit",
					function (event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}
						form.classList.add("was-validated");
					},
					false
				);
			});
		});
	},
	destroyed: function () {
		window.removeEventListener("mousemove", () => {
			var forms = document.getElementsByClassName(
				"needs-validation-registrati"
			);
			// Loop over them and prevent submission
			var validation = Array.prototype.filter.call(forms, function (form) {
				form.addEventListener(
					"submit",
					function (event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}
						form.classList.add("was-validated");
					},
					false
				);
			});
		});
	},
});
