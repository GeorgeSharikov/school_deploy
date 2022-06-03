import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import LinkTool from "@editorjs/link";
import Paragraph from '@editorjs/paragraph'
import ShowInFeed, {activeBlocks, setActiveBlocks} from "../shared/helpers/showInFeedEditorBlockTune/showInFeedEditorBlockTune.js";
import {BASE_SERVER_URL} from "./url.js";
import {getCookie} from "../shared/helpers/getCookie.js";

const UPLOAD_URL = `${BASE_SERVER_URL}static`

let cookieToken = ''
const interval = setInterval(() => {
    if(!!getCookie('token') || getCookie('token')){
        settings.tools.image.config.additionalRequestHeaders.authorization = `Bearer ${getCookie('token')}`
        clearInterval(interval)
    }
}, 1000)

export const settings = {
    holder: 'editorjs',
    placeholder: 'Нажмите Tab для выбора инструмента',
    tools: {
        showInFeed: ShowInFeed,
        paragraph: {
            class: Paragraph,
            placeholder: 'Нажмите Tab для выбора инструмента',
            inlineToolbar: true,
        },
        header: {
            class: Header,
            inlineToolbar: true,
            config: {
                placeholder: 'Заголовок',
                defaultLevel: 1
            }
        },
        image: {
            class: ImageTool,
            inlineToolbar: true,
            config: {
                endpoints: {
                    byFile: `${UPLOAD_URL}/upload`
                },
                additionalRequestHeaders: {
                        'authorization': `Bearer ${cookieToken}`,
                },
                types: 'image/*, video/mp4',
                buttonContent: 'Выберите видео или фото'
            },

        },
        quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
                quotePlaceholder: 'Введите цитату',
                captionPlaceholder: 'Автор Цитаты',
            },
        },
        warning: {
            class: Warning,
            inlineToolbar: true,
            config: {
                titlePlaceholder: 'Загаловок',
                messagePlaceholder: 'Сообщение',
            }
        },
        delimiter: Delimiter,
        list: {
            class: List,
            inlineToolbar: true,
        },
        Marker: {
            class: Marker,
            inlineToolbar: true,
        },
        linkTool: {
            class: LinkTool,
        }
    },
    tunes: ['showInFeed'],
    i18n: {
        messages:{
            ui:{
                "inlineToolbar": {
                    "converter": {
                        "Convert to": "Конвертировать в"
                    }
                }
            },
            toolNames: {
                "Text": "Параграф",
                "Heading": "Заголовок",
                "List": "Список",
                "Warning": "Примечание",
                "Checklist": "Чеклист",
                "Quote": "Цитата",
                "Delimiter": "Разделитель",
                "Link": "Ссылка",
                "Marker": "Маркер",
                "Bold": "Полужирный",
                "Italic": "Курсив",
                "InlineCode": "Моноширинный",
                "Image": "Изображение или видео",
            },
            tools: {
                "link": {
                    "Add a link": "Вставьте ссылку"
                }
            }
        }
    },
    logLevel: 'ERROR',
    onChange: async (api, event) => {
        let a = [...activeBlocks]
        const {blocks} = await api.saver.save()
        const allEditorExistingID = []
        for(let block of blocks){
            allEditorExistingID.push(block['id'])
        }
        for(let markedBlockId of a){
            if(!allEditorExistingID.includes(markedBlockId)){
                a = a.filter(id => id !== markedBlockId)
            }
        }
        setActiveBlocks(a)
    }
}