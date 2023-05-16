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
        // db3d-2600-6c52-7900-7b-451-18aa-1ad0-435c.ngrok.io
        const ooEndpoint = encodeURI(
            `https://office-otter-be.herokuapp.com/api/v1/msteams/?msUserId=${msUserId}&message=${message}&link=${link}`
        )

        if (message !== '' && link !== '') {
            return {
                task: {
                    type: 'continue',
                    value: {
                        width: 600,
                        height: 700,
                        title: 'Create a Task in Office Otter',
                        url: ooEndpoint,
                        fallbackUrl: ooEndpoint,
                    },
                },
            }
        } else {
            return null
        }
    }
}

exports.MessageExtension = MessageExtension
