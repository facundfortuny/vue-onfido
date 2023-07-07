<script setup>
import { onMounted, ref } from 'vue'
import { create, updateEvent } from '@/utils/IdVerification.js'
import * as Onfido from 'onfido-sdk-ui'

let onfido
const applicantId = ref('')

const initObj = {
  name: 'John',
  firstSurname: 'Smith',
  secondSurname: 'Smith',
  phoneCountryCode: '34',
  phoneNumber: '666666666'
}

const initOnfido = async () => {
  try {
    let tokenSDK = ''

    const { applicant, sdkToken } = await create(initObj)
    console.log(sdkToken)
    applicantId.value = applicant.applicantId
    tokenSDK = sdkToken

    onfido = Onfido.init({
      useModal: false,
      token: tokenSDK,
      containerId: 'onfido-mount',
      onComplete: async (data) => {
        // eslint-disable-next-line no-console
        console.log('Everything is complete', data)
      },
      steps: [
        // {
        //   type: 'welcome',
        //   options: {
        //     title: 'ID verification'
        //   }
        // },
        {
          type: 'document',
          options: {
            documentTypes: {
              national_identity_card: true,
              residence_permit: true,
              passport: true
            },
            forceCrossDevice: true
          }
        },
        {
          type: 'face',
          options: {
            requestedVariant: 'motion'
          }
        },
        'complete'
      ],
      language: 'es',
      smsNumberCountryCode: 'ES',
      userDetails: {
        smsNumber: '+' + initObj.phoneCountryCode + initObj.phoneNumber
      }
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err:', err.message, err.request)
  }
}

onMounted(() => {
  initOnfido()
  window.addEventListener('userAnalyticsEvent', (event) => {
    const eventDetail = event.detail

    updateEvent({
      applicantId: applicantId.value,
      eventName: eventDetail.eventName
    })
  })
})
</script>

<template>
  <section>
    <div id="onfido-mount"></div>
  </section>
</template>

<style>
#onfido-mount {
  width: 100%;
  max-width: 350px;
  min-height: 300px;
}
</style>
