import * as Font from 'expo-font'

export const cacheFonts = (
    fonts: { [x: string]: any }[] | (string | Record<string, Font.FontSource>)[]
) => {
    return fonts.map((font: string | Record<string, Font.FontSource>) =>
        Font.loadAsync(font)
    )
}
