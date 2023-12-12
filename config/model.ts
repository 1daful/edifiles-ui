import { DataType } from '../src/utils/types';

export const projectOptions = [
    'website',
    'app',
    'branding',
    'domain name'
]

export const nicheOptions = [
    'blog', 'vlog', 'eCommerce', 'saas'
]

export const brandingOptions = [
    {
        label: 'logo',
        description: 'Design a good logo that defines your purpose and values'
    }, {
        label: 'ui/ux',
        description: 'Design your application UI and UX'
    },
    {
        label: 'Cusom Printing',
        description: 'Make customised materials a part of your business identity.'
    }, 
    {
        label: 'social media',
        description: 'Set a standad communication channel where your customers get to know you better.'
    }
]

export const domainNames = []

export let mediaItems: [{
    index: string,
    items: DataType[]
  
}] = [
  {
      index: "",
      items: []
  }
]

/*class Goal{
    @header() title: string = ''
}*/
//const db: SDKClient = new SDKClient(Repository, '')

//const db = new Repository()

//export const services = await db.readItems('service')