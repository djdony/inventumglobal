<template lang="pug">
  form
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

    v-btn(class="mr-4" @click="submit") submit
    v-btn(@click="clear") clear
</template>
<script>
    import { validationMixin } from 'vuelidate'
    import { required, minLength, email } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            name: { required },
            email: { required, email },
            text: { required, minLength: minLength(100) },
            checkbox: {
                checked (val) {
                    return val
                },
            },
        },

        data: () => ({
            name: '',
            email: '',
            text: null,
            checkbox: false,
        }),

        computed: {
            checkboxErrors () {
                const errors = []
                if (!this.$v.checkbox.$dirty) return errors
                !this.$v.checkbox.checked && errors.push('You must check to continue!')
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
        },

        methods: {
            submit () {
                this.$v.$touch()
            },
            clear () {
                this.$v.$reset()
                this.name = ''
                this.email = ''
                this.text = ''
                this.checkbox = false
            },
        },
    }
</script>