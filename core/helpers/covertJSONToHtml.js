import sizeOf from 'image-size'
import path from 'path'

class ConvertToHTML{
constructor() {
        this.quoteSvg = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    \t width="123.961px" height="123.961px" viewBox="0 0 123.961 123.961" style="enable-background:new 0 0 123.961 123.961;"
    \t xml:space="preserve">
    <g>
    \t<path d="M49.8,29.032c3.1-1.3,4.4-5,3-8l-4.9-10.3c-1.4-2.899-4.8-4.2-7.8-2.899c-8.5,3.6-15.8,8.3-21.6,14
    \t\tC11.4,28.532,6.6,36.232,4,44.732c-2.6,8.601-4,20.3-4,35.2v30.7c0,3.3,2.7,6,6,6h39.3c3.3,0,6-2.7,6-6v-39.3c0-3.301-2.7-6-6-6
    \t\tH26.5c0.2-10.101,2.6-18.2,7-24.301C37.1,36.133,42.5,32.133,49.8,29.032z"/>
    \t<path d="M120.4,29.032c3.1-1.3,4.399-5,3-8l-4.9-10.199c-1.4-2.9-4.8-4.2-7.8-2.9c-8.4,3.6-15.601,8.3-21.5,13.9
    \t\tc-7.101,6.8-12,14.5-14.601,23c-2.6,8.399-3.899,20.1-3.899,35.1v30.7c0,3.3,2.7,6,6,6H116c3.3,0,6-2.7,6-6v-39.3
    \t\tc0-3.301-2.7-6-6-6H97.1c0.2-10.101,2.601-18.2,7-24.301C107.7,36.133,113.1,32.133,120.4,29.032z"/>
    </g>
    </svg>`
}


    #insertToBaseParagraphDiv(text){
        return `<div class="I-island-a">${text}</div>`
    }

    #paragraph(data){
        let {text} = data
        let tmp = text.split(" ")
        if(tmp[0] === "&nbsp;"){
            text = tmp.filter((el, i) => (el !== "&nbsp;" && i !== 0)).join(" ")
        }
        let textP = `<p>${text}</p>`
        return this.#insertToBaseParagraphDiv(textP)
    }



    #insertImageToFigure(data, caption, type){
        return `<figure class="figure-image">
                        ${data}
                    <div class="I-island-a">
                        <span class="content-image-caption">${caption}</span>
                    </div>
                </figure>`
    }

    #getImageSizes(url){
        url = url.split("/")
        const imgId = url[url.length-1]
        try {
            return sizeOf(path.resolve(path.dirname(''),`Static/images/${imgId}`));
        } catch (err) {
            console.error(err);
        }
    }

    #createImgWrappDiv(url, height, width, type){
        const img = `<img src="${url}"/>`
        const divImg = `<div class="image-inner" style="padding-bottom: 0px; background: transparent;">${img}</div>`
        let maxWidth = 0
        let maxHeight = 0
        if(type === 'simple'){
            maxWidth = width
            maxHeight = height
        }
        if(type === 'stretched'){
            maxWidth = 1020
            maxHeight = height
        }
        if(type === 'stretched and border'){
            maxWidth = 613
            maxHeight = height
        }
        if(type === 'border'){
            maxWidth = 613
            maxHeight = height
        }
        if(type === 'background'){
            maxWidth = (460 * width)/height
            maxHeight = 460
        }
        return `<div style="max-width: ${maxWidth}px;max-height: ${maxHeight}px; width: 100%">
                ${divImg}
            </div>`
    }

    #createStretchedImageForArticle(url, caption){
        const {height, width} = this.#getImageSizes(url)
        if(width < 1020 || height > 1500){
            return `<figure class="figure-image">
            <div class="I-island-b">
                <div class='content-image image-padding content-image-background''>
                    <div style="max-width: ${(460 * width)/height}px;max-height: 460px; width: 100%">
                        <div class="image-inner" style="padding-bottom: 0px; background: transparent;">
                            <img src="${url}"/>
                        </div>
                    </div>
                </div>
            </div>
             <div class="I-island-a">
                    <span class="content-image-caption">${caption}</span>
              </div>
        </figure>`
        }
        return `<figure class="figure-image">
            <div class="I-island-c">
                <div class='content-image '>
                    <div style="max-width: 1020px;max-height: ${height}px; width: 100%">
                        <div class="image-inner" style="padding-bottom: 0px; background: transparent;">
                            <img src="${url}"/>
                        </div>
                    </div>
                </div>
            </div>
             <div class="I-island-a">
                    <span class="content-image-caption">${caption}</span>
              </div>
        </figure>`
    }

    #image(data){
        if(!data.file.isImage){
            return this.#video(data.file.url)
        }
        const url = data.file.url
        const caption = data.caption
        const {height, width} = this.#getImageSizes(url)

        let contentWrapperClasses = 'content-image'
        if(data.withBorder || data.withBackground){
            contentWrapperClasses+=' image-padding content-image-background'
        }

        let type
        if((data.withBorder && data.stretched) || data.withBorder){
            type = 'border'
        }
        if(data.stretched){
            type = 'stretched'
        }
        if(data.stretched && data.withBorder){
            type = 'stretched and border'
        }
        if(!data.withBorder && !data.stretched && !data.withBackground){
            type = 'simple'
        }
        if(data.withBackground || (data.withBorder && data.stretched && data.withBackground)){
            type = 'background'
        }
        if(height > 1500){
            type='background'
            contentWrapperClasses+=' image-padding content-image-background'
        }
        const typeClass = type === 'stretched' ? `I-island-c` : type === 'simple' ? `I-island-a` : `I-island-b`
        const contentWrapper = `<div class=${typeClass}><div class="${contentWrapperClasses}">
            ${this.#createImgWrappDiv(url, height, width, type)}
        </div></div>`
        const forFeed = this.#insertImageToFigure(contentWrapper, caption)
        let forArticle = ''
        if(type === 'stretched' || type ==='stretched and border'){
            forArticle+=this.#createStretchedImageForArticle(url, caption)
        }else{
            forArticle = forFeed
        }
        return {forFeed, forArticle}
    }

    #video(url){
        const forFeed = `<figure class="figure-image">
            <div class="I-island-c">
                <div class='content-image'>
                    <div style="max-width: 640px; width: 100%">
                        <div class="video__container">
                            <video autoplay loop controls muted playsinline style="display: block;width:  100%;">
                                <source src=${url}>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </figure>`
        const forArticle = `<figure class="figure-image">
            <div class="I-island-b">
                <div class='content-image'>
                    <div style="max-width: 600px; width: 100%">
                        <div class="video__container">
                            <video autoplay loop controls muted playsinline style="display: block;width:  100%;">
                                <source src=${url}>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </figure>`
        return {forArticle, forFeed}
    }

    #createHeader(lvl, text){
        return `<h${lvl}><div class="I-island-a">${text}</div></h${lvl}>`
    }

    #header(data){
        const {text, level} = data
        return this.#createHeader(level, text)
    }

    #createList(style, items){
        let list = ''
        for(const item of items) {
            list += `<li>${item}</li>\n`
        }
        return style === 'ordered'
            ? `<ol>${list}</ol>`
            : `<ul>${list}</ul>`
    }
    #list(data){
        const {style, items} = data
        const listText = this.#createList(style, items)
        return this.#insertToBaseParagraphDiv(listText)
    }

    #delimiter(){
        const text = '<div class="block-delimiter"></div>'
        return `<figure>
            ${this.#insertToBaseParagraphDiv(text)}
        </figure>`
    }
    #warning({title, message}){
        const text = `<div class="warning">
             <div class="warning_title">
                <span class="warning_sign">&#9757;</span>
                <p>${title}</p>
              </div>
             <span class="warning_text">${message}</span>
        </div>`
        return this.#insertToBaseParagraphDiv(text)
    }

    #quote({text, caption, alignment}){
        const alignmentClass = alignment === 'left' ? 'quote' : 'quote quote_text_center'
        const quoteSize = text.length > 100 
        ? text.length < 200 ? "quote_text_medium" : "quote_text" 
        : "quote_text_big"
        return `
        <figure>
            <div class="I-island-b">
                <blockquote class="${alignmentClass}">
                    <div class="quote_content">
                        ${this.quoteSvg}
                        <div class="${quoteSize}">
                            <p>${text}</p>
                        </div>
                        <div class="quote_author">
                            <p>${caption}</p>
                        </div>
                    </div>
                </blockquote>
            </div>
        </figure>`
    }
    convert({data, title}){
        const blocks = data["blocks"]
        const blocksToFeed = blocks[0]?.['tunes'].showInFeed

        let title_paragraph = ''
        let title_image = ''
        let count = 0
        let html = ''
        for(let {type, data, id} of blocks){
            let html_element = ''
            switch (type) {
                case "paragraph":
                    html_element+=this.#paragraph(data)
                    break
                case "image":
                    const {forFeed, forArticle} = this.#image(data, blocksToFeed.includes(id))
                    html+=forArticle
                    html_element+=forFeed
                    break
                case "header":
                    html_element+=this.#header(data)
                    break
                case "list":
                    html_element+=this.#list(data)
                    break
                case "delimiter":
                    html_element+=this.#delimiter()
                    break
                case "warning":
                    html_element+=this.#warning(data)
                    break
                case "quote":
                    html_element+=this.#quote(data)
                    break
            }

            if(blocksToFeed.includes(id)){
                if(count === 0){
                    title_paragraph = html_element
                    count+=1
                }else{
                    title_image = html_element
                }
            }
            if(type !== 'image'){
                html+=html_element
            }

        }
        const articleWrapper = `<div class="content">
                                <div class="I-island-a"><h1 class="content_title">${title}</h1></div>
                                <div class="content_main">
                                   ${html}
                                </div>
                            </div>`

        return  {
            articleHTML: articleWrapper,
            title_paragraph,
            title_image,
            blocksToFeed: blocksToFeed.join(" ")
        }

    }
}

export const JSONToHtml = new ConvertToHTML()

// const data =  {
//      "file": {
//          "url": "http://localhost:4000/api/static/images/3f27254c-7209-43ea-a36d-28e3ec62fcee.jpg"
//      },
//      "caption": "Центра антарктических исследований GAIAЦентра антарктических исследований GAIA",
//      "withBorder": false,
//      "stretched": false,
//      "withBackground": false
// }
