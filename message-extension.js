const { TeamsActivityHandler } = require('botbuilder')

class MessageExtension extends TeamsActivityHandler {
    async handleTeamsMessagingExtensionFetchTask(context, action) {
        // const msUserId = context._activity.from.aadObjectId
        const message = action.messagePayload
            ? action.messagePayload.body.content
            : ''
        const link = action.messagePayload
            ? action.messagePayload.linkToMessage
            : ''

        const llamaExtensionEndpoint = encodeURI(
            `https://af7b-2600-6c52-7900-7b-8c1b-d9d7-a0ad-cb2b.ngrok-free.app/teams/message-extension?message=${message}&link=${link}`
        )
        if (message !== '' && link !== '') {
            return {
                task: {
                    type: 'continue',
                    value: {
                        width: 600,
                        height: 200,
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
