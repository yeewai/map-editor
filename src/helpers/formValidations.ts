export interface validationFunc { ( val: any ): string | undefined; };

export const required: validationFunc = (val) => ( val ? undefined : 'Required')

export const arrayNotEmpty = (val) => ( val && val.length > 0 ? undefined : 'Required');

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ ;

export const validUrl = ( val ) => ( val && val.match(urlRegex) ? undefined : "Must be a valid url" )
