const { TeamsActivityHandler } = require('botbuilder')

class MessageExtension extends TeamsActivityHandler {
    async handleTeamsMessagingExtensionFetchTask(context, action) {
        const msUserId = context._activity.from.aadObjectId
        const message = action.messagePayload
            ? action.messagePayload.body.content
            : ''
        const link = action.messagePayload
            ? action.messagePayload.linkToMessage
            : ''

        const llamaExtensionEndpoint = encodeURI(
            `https://a2a7-2600-6c52-7900-7b-215a-bd04-92e3-8cf5.ngrok-free.app/teamsExtension/?msUserId=${msUserId}&message=${message}&link=${link}`
        )
        if (message !== '' && link !== '') {
            return {
                task: {
                    type: 'continue',
                    value: {
                        width: 500,
                        height: 400,
                        url: llamaExtensionEndpoint,
                        title: 'Create a Task in Llama Llist',
                    },
                },
            }
        } else {
            return null
        }
    }
}

exports.MessageExtension = MessageExtension
