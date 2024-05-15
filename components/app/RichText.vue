<template>
    <nodeParent></nodeParent>
</template>

<script lang="tsx" setup>
import ILink from './ILink.vue';
import StreamedSpan from './StreamedSpan.vue';

const { props } = defineProps<{ props: RichText[] }>()

type ExtractSpansType<T> = T extends { spans: infer S } ? S : never;
type Spans = ExtractSpansType<RichText>[number];

let nodeParent = <div>
    {
        props.map(richText => {
            let text = richText.text

            if (richText.spans.length === 0) {

                return <>
                    <StreamedSpan text={text} />
                </>
            }
            else {
                return richText.spans.map((span, index) => {
                    const spanText = text.slice(span.start, span.end)
                    return <>
                        {/* <span v-streamed-text>{text.slice(props.spans[index - 1]?.end || 0, span.start)}</span> */}
                        <StreamedSpan text={text.slice(richText.spans[index - 1]?.end || 0, span.start)} />
                        {getAnchor(span, spanText)}
                        {index === richText.spans.length - 1 && <><StreamedSpan text={text.slice(span.end, text.length)} /><br></br></>}
                    </>
                })
            }


        })}
</div >

function getAnchor(span: Spans, text: string) {
    if (span.type === "hyperlink") {
        // return <a href={span.data.url} target="_blank">{text}</a>
        return <ILink font={true} text={text} href={span.data.url} />
    } else if (span.type === "newline") {
        return <>
            <br />
        </>
    }
    return undefined
}

</script>

<style lang="scss">
@use "@/styles/shared.scss" as *;

.rich-text__wrapper {
    @include font-size;
    line-height: 1.6rem;

    a {
        position: relative;
        @include font-size;
        line-height: 1.6rem;
    }

    a::after {
        content: "Visit";
        position: absolute;
        left: 0;
        top: 0;

        color: $neutral-text;
        opacity: 0;
    }

    a:hover::after {
        opacity: 1;
    }
}
</style>
