const config = require('config')
const { BotFrameworkAdapter } = require('botbuilder')

const adapter = new BotFrameworkAdapter({
    appId: config.get('bot.appId'),
    appPassword: config.get('bot.appPassword'),
})

adapter.onTurnError = async (context, error) => {
    console.log('TURN CONTEXT:')
    console.log(context)

    console.error(`\n [onTurnError] unhandled error: ${error}`)
}

exports.adapter = adapter
