<script setup>
import { onMounted, ref } from 'vue'
import { create, updateEvent } from '@/utils/IdVerification.js'
import * as Onfido from 'onfido-sdk-ui'

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

    Onfido.init({
      useModal: false,
      token: tokenSDK,
      containerId: 'onfido-mount',
      onComplete: async (data) => {
        // eslint-disable-next-line no-console
        console.log('Everything is complete', data)
      },
      steps: [
        {
          type: 'document',
          options: {
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
  <section class="idVerificationContainer">
    <div id="onfido-mount"></div>
  </section>
</template>

<style>
.idVerificationContainer {
  height: 600px;
}
@media only screen and (max-width: 479px) {
  .idVerificationContainer #onfido-mount .onfido-sdk-ui-Modal-inner {
    position: relative;
    height: 37.5rem;
    border-radius: 8px;
  }
}
.idVerificationContainer #onfido-mount p {
  margin-bottom: 0;
}
.idVerificationContainer #onfido-mount .onfido-sdk-ui-PageTitle-titleWrapper {
  margin-top: 0;
  margin-bottom: 8px;
}
.idVerificationContainer
  #onfido-mount
  .onfido-sdk-ui-PageTitle-titleWrapper
  .onfido-sdk-ui-PageTitle-title {
  font-size: 22px !important;
}
.idVerificationContainer
  #onfido-mount
  .onfido-sdk-ui-PageTitle-titleWrapper
  .onfido-sdk-ui-PageTitle-subTitle {
  font-size: 16px !important;
}
</style>
