import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4rq0irpr',
    dataset: 'production'
  },
  // Tip: You can use an environment variable for studioHost if you want to deploy separate Studios for production, staging, testing etc.
  studioHost: 'portfolio-26'
})

// import {defineCliConfig} from 'sanity/cli'

// export default defineCliConfig({
//   api: {
//     projectId: 'ipbdfel6',
//     dataset: 'production'
//   },
//   /**
//    * Enable auto-updates for studios.
//    * Learn more at https://www.sanity.io/docs/cli#auto-updates
//    */
//   autoUpdates: true,
// })
