<template lang="pug">
  form
    v-text-field(
      v-model="subject"
      :error-messages="subjectErrors"
      counter
      label="Subject"
      required
      @input="$v.subject.$touch()"
      @blur="$v.subject.$touch()"
    )
    v-text-field(
        v-model="name"
        :error-messages="nameErrors"
        counter
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    )
    v-text-field(
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
    )
    v-textarea(
        v-model="text"
        :error-messages="textErrors"
        label="Text"
        required
        counter
        outlined
        rows="10"
        @input="$v.text.$touch()"
        @blur="$v.text.$touch()"
      )
    v-checkbox(
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Please check to ensure that your are real human?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
    )

    v-btn(class="mr-4" :disabled="!isComplete" @click="submit") submit
    v-btn(@click="clear") clear
</template>
<script>
    import { validationMixin } from 'vuelidate'
    import { required, minLength, email } from 'vuelidate/lib/validators'
    import { mapMutations } from 'vuex'

    export default {
        mixins: [validationMixin],

        validations: {
            subject: { required },
            name: { required },
            email: { required, email },
            text: { required, minLength: minLength(50) },
            checkbox: {
                checked (val) {
                    return val
                },
            },

        },

        data: () => ({
            subject: '',
            name: '',
            email: '',
            text: '',
            checkbox: false,
            errors: true
        }),

        computed: {
            checkboxErrors () {
                const errors = []
                if (!this.$v.checkbox.$dirty) return errors
                !this.$v.checkbox.checked && errors.push('You must check to continue!')
                return errors
            },
          subjectErrors () {
            const errors = []
            if (!this.$v.subject.$dirty) return errors
            !this.$v.subject.required && errors.push('Subject is required.')
            return errors
          },
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.required && errors.push('Name is required.')
                return errors
            },
            textErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.text.minLength && errors.push('Text must be at least 100 characters long')
                !this.$v.text.required && errors.push('Text is required.')
                return errors
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            isComplete () {
                if (this.name.length > 0 && this.subject.length > 0 && this.email.length > 8 && this.text.length > 10 && this.checkbox == true )
                    return true;
            },
            else() {
                return false;
            }
        },

        methods: {
          ...mapMutations({
            showSnackbar: 'snackbar/showSnackbar'
          }),
            async submit () {
                this.$v.$touch();
                if(this.subject.length > 0 && this.name.length > 0 && this.email.length > 8 && this.text.length > 10){
                    let mail = {
                        subject: this.subject,
                        name: this.name,
                        email: this.email,
                        text: this.text
                    }
                  await this.$axios.post('/contact', mail).then( response => {
                    this.success = true;
                  } )
                    .catch((error) => {
                    this.mail = error.response.data.errors;
                    this.success = false;
                  })
                  this.clear()

                  this.showSnackbar({
                    message: 'Mail has been sent',
                    color: 'green'
                  })


                }


          },
            clear () {
                this.$v.$reset()
                this.subject = ''
                this.name = ''
                this.email = ''
                this.text = ''
                this.checkbox = false
            },
        },
    }
</script>