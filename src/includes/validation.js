import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  min_value as minVal,
  max,
  max_value as maxVal,
  alpha_spaces as alphaSpaces,
  email,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('alphaSpaces', alphaSpaces)
    // defineRule('confirmed', confirmed) //password confirm
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    defineRule('tos', required)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alphaSpaces: `The field ${ctx.field} is required`,
          email: `The field ${ctx.field}  `,
          min_value: `The field ${ctx.field}  is too low`,
          max_value: `The field ${ctx.field}  is too high `,
          excluded: `You are not allowed to use  ${ctx.field}  `,
          country_excluded: `Location not allowed `,
          passwords_mismatch: 'The passwords dont match',
          tos: `Please accept rules`
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
