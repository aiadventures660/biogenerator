import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Type, RefreshCw, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
  bioText: string;
  setBioText: (text: string) => void;
}
const fontTransforms = {
  normal: (text: string) => text,
  bold: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const boldMap: {
      [key: string]: string;
    } = {
      'a': '𝗮',
      'b': '𝗯',
      'c': '𝗰',
      'd': '𝗱',
      'e': '𝗲',
      'f': '𝗳',
      'g': '𝗴',
      'h': '𝗵',
      'i': '𝗶',
      'j': '𝗷',
      'k': '𝗸',
      'l': '𝗹',
      'm': '𝗺',
      'n': '𝗻',
      'o': '𝗼',
      'p': '𝗽',
      'q': '𝗾',
      'r': '𝗿',
      's': '𝘀',
      't': '𝘁',
      'u': '𝘂',
      'v': '𝘃',
      'w': '𝘄',
      'x': '𝘅',
      'y': '𝘆',
      'z': '𝘇',
      'A': '𝗔',
      'B': '𝗕',
      'C': '𝗖',
      'D': '𝗗',
      'E': '𝗘',
      'F': '𝗙',
      'G': '𝗚',
      'H': '𝗛',
      'I': '𝗜',
      'J': '𝗝',
      'K': '𝗞',
      'L': '𝗟',
      'M': '𝗠',
      'N': '𝗡',
      'O': '𝗢',
      'P': '𝗣',
      'Q': '𝗤',
      'R': '𝗥',
      'S': '𝗦',
      'T': '𝗧',
      'U': '𝗨',
      'V': '𝗩',
      'W': '𝗪',
      'X': '𝗫',
      'Y': '𝗬',
      'Z': '𝗭',
      '0': '𝟬',
      '1': '𝟭',
      '2': '𝟮',
      '3': '𝟯',
      '4': '𝟰',
      '5': '𝟱',
      '6': '𝟲',
      '7': '𝟳',
      '8': '𝟴',
      '9': '𝟵'
    };
    return boldMap[char] || char;
  }),
  italic: (text: string) => text.replace(/[a-zA-Z]/g, char => {
    const italicMap: {
      [key: string]: string;
    } = {
      'a': '𝘢',
      'b': '𝘣',
      'c': '𝘤',
      'd': '𝘥',
      'e': '𝘦',
      'f': '𝘧',
      'g': '𝘨',
      'h': '𝘩',
      'i': '𝘪',
      'j': '𝘫',
      'k': '𝘬',
      'l': '𝘭',
      'm': '𝘮',
      'n': '𝘯',
      'o': '𝘰',
      'p': '𝘱',
      'q': '𝘲',
      'r': '𝘳',
      's': '𝘴',
      't': '𝘵',
      'u': '𝘶',
      'v': '𝘷',
      'w': '𝘸',
      'x': '𝘹',
      'y': '𝘺',
      'z': '𝘻',
      'A': '𝘈',
      'B': '𝘉',
      'C': '𝘊',
      'D': '𝘋',
      'E': '𝘌',
      'F': '𝘍',
      'G': '𝘎',
      'H': '𝘏',
      'I': '𝘐',
      'J': '𝘑',
      'K': '𝘒',
      'L': '𝘓',
      'M': '𝘔',
      'N': '𝘕',
      'O': '𝘖',
      'P': '𝘗',
      'Q': '𝘘',
      'R': '𝘙',
      'S': '𝘚',
      'T': '𝘛',
      'U': '𝘜',
      'V': '𝘝',
      'W': '𝘞',
      'X': '𝘟',
      'Y': '𝘠',
      'Z': '𝘡'
    };
    return italicMap[char] || char;
  }),
  cursive: (text: string) => text.replace(/[a-zA-Z]/g, char => {
    const cursiveMap: {
      [key: string]: string;
    } = {
      'a': '𝒶',
      'b': '𝒷',
      'c': '𝒸',
      'd': '𝒹',
      'e': '𝑒',
      'f': '𝒻',
      'g': '𝑔',
      'h': '𝒽',
      'i': '𝒾',
      'j': '𝒿',
      'k': '𝓀',
      'l': '𝓁',
      'm': '𝓂',
      'n': '𝓃',
      'o': '𝑜',
      'p': '𝓅',
      'q': '𝓆',
      'r': '𝓇',
      's': '𝓈',
      't': '𝓉',
      'u': '𝓊',
      'v': '𝓋',
      'w': '𝓌',
      'x': '𝓍',
      'y': '𝓎',
      'z': '𝓏',
      'A': '𝒜',
      'B': '𝐵',
      'C': '𝒞',
      'D': '𝒟',
      'E': '𝐸',
      'F': '𝐹',
      'G': '𝒢',
      'H': '𝐻',
      'I': '𝐼',
      'J': '𝒥',
      'K': '𝒦',
      'L': '𝐿',
      'M': '𝑀',
      'N': '𝒩',
      'O': '𝒪',
      'P': '𝒫',
      'Q': '𝒬',
      'R': '𝑅',
      'S': '𝒮',
      'T': '𝒯',
      'U': '𝒰',
      'V': '𝒱',
      'W': '𝒲',
      'X': '𝒳',
      'Y': '𝒴',
      'Z': '𝒵'
    };
    return cursiveMap[char] || char;
  }),
  fancy: (text: string) => text.replace(/[a-zA-Z]/g, char => {
    const fancyMap: {
      [key: string]: string;
    } = {
      'a': 'ᴀ',
      'b': 'ʙ',
      'c': 'ᴄ',
      'd': 'ᴅ',
      'e': 'ᴇ',
      'f': 'ꜰ',
      'g': 'ɢ',
      'h': 'ʜ',
      'i': 'ɪ',
      'j': 'ᴊ',
      'k': 'ᴋ',
      'l': 'ʟ',
      'm': 'ᴍ',
      'n': 'ɴ',
      'o': 'ᴏ',
      'p': 'ᴘ',
      'q': 'Q',
      'r': 'ʀ',
      's': 'ꜱ',
      't': 'ᴛ',
      'u': 'ᴜ',
      'v': 'ᴠ',
      'w': 'ᴡ',
      'x': 'x',
      'y': 'ʏ',
      'z': 'ᴢ',
      'A': 'ᴀ',
      'B': 'ʙ',
      'C': 'ᴄ',
      'D': 'ᴅ',
      'E': 'ᴇ',
      'F': 'ꜰ',
      'G': 'ɢ',
      'H': 'ʜ',
      'I': 'ɪ',
      'J': 'ᴊ',
      'K': 'ᴋ',
      'L': 'ʟ',
      'M': 'ᴍ',
      'N': 'ɴ',
      'O': 'ᴏ',
      'P': 'ᴘ',
      'Q': 'Q',
      'R': 'ʀ',
      'S': 'ꜱ',
      'T': 'ᴛ',
      'U': 'ᴜ',
      'V': 'ᴠ',
      'W': 'ᴡ',
      'X': 'x',
      'Y': 'ʏ',
      'Z': 'ᴢ'
    };
    return fancyMap[char] || char;
  }),
  spaced: (text: string) => text.split('').join(' '),
  circled: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const circledMap: {
      [key: string]: string;
    } = {
      'a': 'ⓐ',
      'b': 'ⓑ',
      'c': 'ⓒ',
      'd': 'ⓓ',
      'e': 'ⓔ',
      'f': 'ⓕ',
      'g': 'ⓖ',
      'h': 'ⓗ',
      'i': 'ⓘ',
      'j': 'ⓙ',
      'k': 'ⓚ',
      'l': 'ⓛ',
      'm': 'ⓜ',
      'n': 'ⓝ',
      'o': 'ⓞ',
      'p': 'ⓟ',
      'q': 'ⓠ',
      'r': 'ⓡ',
      's': 'ⓢ',
      't': 'ⓣ',
      'u': 'ⓤ',
      'v': 'ⓥ',
      'w': 'ⓦ',
      'x': 'ⓧ',
      'y': 'ⓨ',
      'z': 'ⓩ',
      'A': 'Ⓐ',
      'B': 'Ⓑ',
      'C': 'Ⓒ',
      'D': 'Ⓓ',
      'E': 'Ⓔ',
      'F': 'Ⓕ',
      'G': 'Ⓖ',
      'H': 'Ⓗ',
      'I': 'Ⓘ',
      'J': 'Ⓙ',
      'K': 'Ⓚ',
      'L': 'Ⓛ',
      'M': 'Ⓜ',
      'N': 'Ⓝ',
      'O': 'Ⓞ',
      'P': 'Ⓟ',
      'Q': 'Ⓠ',
      'R': 'Ⓡ',
      'S': 'Ⓢ',
      'T': 'Ⓣ',
      'U': 'Ⓤ',
      'V': 'Ⓥ',
      'W': 'Ⓦ',
      'X': 'Ⓧ',
      'Y': 'Ⓨ',
      'Z': 'Ⓩ',
      '0': '⓪',
      '1': '①',
      '2': '②',
      '3': '③',
      '4': '④',
      '5': '⑤',
      '6': '⑥',
      '7': '⑦',
      '8': '⑧',
      '9': '⑨'
    };
    return circledMap[char] || char;
  }),
  squared: (text: string) => text.replace(/[a-zA-Z]/g, char => {
    const squaredMap: {
      [key: string]: string;
    } = {
      'a': '🅰',
      'b': '🅱',
      'c': '🅲',
      'd': '🅳',
      'e': '🅴',
      'f': '🅵',
      'g': '🅶',
      'h': '🅷',
      'i': '🅸',
      'j': '🅹',
      'k': '🅺',
      'l': '🅻',
      'm': '🅼',
      'n': '🅽',
      'o': '🅾',
      'p': '🅿',
      'q': '🆀',
      'r': '🆁',
      's': '🆂',
      't': '🆃',
      'u': '🆄',
      'v': '🆅',
      'w': '🆆',
      'x': '🆇',
      'y': '🆈',
      'z': '🆉',
      'A': '🅰',
      'B': '🅱',
      'C': '🅲',
      'D': '🅳',
      'E': '🅴',
      'F': '🅵',
      'G': '🅶',
      'H': '🅷',
      'I': '🅸',
      'J': '🅹',
      'K': '🅺',
      'L': '🅻',
      'M': '🅼',
      'N': '🅽',
      'O': '🅾',
      'P': '🅿',
      'Q': '🆀',
      'R': '🆁',
      'S': '🆂',
      'T': '🆃',
      'U': '🆄',
      'V': '🆅',
      'W': '🆆',
      'X': '🆇',
      'Y': '🆈',
      'Z': '🆉'
    };
    return squaredMap[char] || char;
  }),
  underlined: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const underlinedMap: {
      [key: string]: string;
    } = {
      'a': 'a̲',
      'b': 'b̲',
      'c': 'c̲',
      'd': 'd̲',
      'e': 'e̲',
      'f': 'f̲',
      'g': 'g̲',
      'h': 'h̲',
      'i': 'i̲',
      'j': 'j̲',
      'k': 'k̲',
      'l': 'l̲',
      'm': 'm̲',
      'n': 'n̲',
      'o': 'o̲',
      'p': 'p̲',
      'q': 'q̲',
      'r': 'r̲',
      's': 's̲',
      't': 't̲',
      'u': 'u̲',
      'v': 'v̲',
      'w': 'w̲',
      'x': 'x̲',
      'y': 'y̲',
      'z': 'z̲',
      'A': 'A̲',
      'B': 'B̲',
      'C': 'C̲',
      'D': 'D̲',
      'E': 'E̲',
      'F': 'F̲',
      'G': 'G̲',
      'H': 'H̲',
      'I': 'I̲',
      'J': 'J̲',
      'K': 'K̲',
      'L': 'L̲',
      'M': 'M̲',
      'N': 'N̲',
      'O': 'O̲',
      'P': 'P̲',
      'Q': 'Q̲',
      'R': 'R̲',
      'S': 'S̲',
      'T': 'T̲',
      'U': 'U̲',
      'V': 'V̲',
      'W': 'W̲',
      'X': 'X̲',
      'Y': 'Y̲',
      'Z': 'Z̲',
      '0': '0̲',
      '1': '1̲',
      '2': '2̲',
      '3': '3̲',
      '4': '4̲',
      '5': '5̲',
      '6': '6̲',
      '7': '7̲',
      '8': '8̲',
      '9': '9̲'
    };
    return underlinedMap[char] || char;
  }),
  // NEW FONT VARIATIONS
  double: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const doubleMap: {
      [key: string]: string;
    } = {
      'a': '𝕒',
      'b': '𝕓',
      'c': '𝕔',
      'd': '𝕕',
      'e': '𝕖',
      'f': '𝕗',
      'g': '𝕘',
      'h': '𝕙',
      'i': '𝕚',
      'j': '𝕛',
      'k': '𝕜',
      'l': '𝕝',
      'm': '𝕞',
      'n': '𝕟',
      'o': '𝕠',
      'p': '𝕡',
      'q': '𝕢',
      'r': '𝕣',
      's': '𝕤',
      't': '𝕥',
      'u': '𝕦',
      'v': '𝕧',
      'w': '𝕨',
      'x': '𝕩',
      'y': '𝕪',
      'z': '𝕫',
      'A': '𝔸',
      'B': '𝔹',
      'C': 'ℂ',
      'D': '𝔻',
      'E': '𝔼',
      'F': '𝔽',
      'G': '𝔾',
      'H': 'ℍ',
      'I': '𝕀',
      'J': '𝕁',
      'K': '𝕂',
      'L': '𝕃',
      'M': '𝕄',
      'N': 'ℕ',
      'O': '𝕆',
      'P': 'ℙ',
      'Q': 'ℚ',
      'R': 'ℝ',
      'S': '𝕊',
      'T': '𝕋',
      'U': '𝕌',
      'V': '𝕍',
      'W': '𝕎',
      'X': '𝕏',
      'Y': '⅄',
      'Z': 'ℤ',
      '0': '𝟘',
      '1': '𝟙',
      '2': '𝟚',
      '3': '𝟛',
      '4': '𝟜',
      '5': '𝟝',
      '6': '𝟞',
      '7': '𝟟',
      '8': '𝟠',
      '9': '𝟡'
    };
    return doubleMap[char] || char;
  }),
  monospace: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const monospaceMap: {
      [key: string]: string;
    } = {
      'a': '𝚊',
      'b': '𝚋',
      'c': '𝚌',
      'd': '𝚍',
      'e': '𝚎',
      'f': '𝚏',
      'g': '𝚐',
      'h': '𝚑',
      'i': '𝚒',
      'j': '𝚓',
      'k': '𝚔',
      'l': '𝚕',
      'm': '𝚖',
      'n': '𝚗',
      'o': '𝚘',
      'p': '𝚙',
      'q': '𝚚',
      'r': '𝚛',
      's': '𝚜',
      't': '𝚝',
      'u': '𝚞',
      'v': '𝚟',
      'w': '𝚠',
      'x': '𝚡',
      'y': '𝚢',
      'z': '𝚣',
      'A': '𝙰',
      'B': '𝙱',
      'C': '𝙲',
      'D': '𝙳',
      'E': '𝙴',
      'F': '𝙵',
      'G': '𝙶',
      'H': '𝙷',
      'I': '𝙸',
      'J': '𝙹',
      'K': '𝙺',
      'L': '𝙻',
      'M': '𝙼',
      'N': '𝙽',
      'O': '𝙾',
      'P': '𝙿',
      'Q': '𝚀',
      'R': '𝚁',
      'S': '𝚂',
      'T': '𝚃',
      'U': '𝚄',
      'V': '𝚅',
      'W': '𝚆',
      'X': '𝚇',
      'Y': '𝚈',
      'Z': '𝚉',
      '0': '𝟶',
      '1': '𝟷',
      '2': '𝟸',
      '3': '𝟹',
      '4': '𝟺',
      '5': '𝟻',
      '6': '𝟼',
      '7': '𝟽',
      '8': '𝟾',
      '9': '𝟿'
    };
    return monospaceMap[char] || char;
  }),
  strikethrough: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    return char + '̶';
  }),
  bubble: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const bubbleMap: {
      [key: string]: string;
    } = {
      'a': 'ⓐ',
      'b': 'ⓑ',
      'c': 'ⓒ',
      'd': 'ⓓ',
      'e': 'ⓔ',
      'f': 'ⓕ',
      'g': 'ⓖ',
      'h': 'ⓗ',
      'i': 'ⓘ',
      'j': 'ⓙ',
      'k': 'ⓚ',
      'l': 'ⓛ',
      'm': 'ⓜ',
      'n': 'ⓝ',
      'o': 'ⓞ',
      'p': 'ⓟ',
      'q': 'ⓠ',
      'r': 'ⓡ',
      's': 'ⓢ',
      't': 'ⓣ',
      'u': 'ⓤ',
      'v': 'ⓥ',
      'w': 'ⓦ',
      'x': 'ⓧ',
      'y': 'ⓨ',
      'z': 'ⓩ',
      'A': 'Ⓐ',
      'B': 'Ⓑ',
      'C': 'Ⓒ',
      'D': 'Ⓓ',
      'E': 'Ⓔ',
      'F': 'Ⓕ',
      'G': 'Ⓖ',
      'H': 'Ⓗ',
      'I': 'Ⓘ',
      'J': 'Ⓙ',
      'K': 'Ⓚ',
      'L': 'Ⓛ',
      'M': 'Ⓜ',
      'N': 'Ⓝ',
      'O': 'Ⓞ',
      'P': 'Ⓟ',
      'Q': 'Ⓠ',
      'R': 'Ⓡ',
      'S': 'Ⓢ',
      'T': 'Ⓣ',
      'U': 'Ⓤ',
      'V': 'Ⓥ',
      'W': 'Ⓦ',
      'X': 'Ⓧ',
      'Y': 'Ⓨ',
      'Z': 'Ⓩ',
      '0': '⓪',
      '1': '①',
      '2': '②',
      '3': '③',
      '4': '④',
      '5': '⑤',
      '6': '⑥',
      '7': '⑦',
      '8': '⑧',
      '9': '⑨'
    };
    return bubbleMap[char] || char;
  }),
  reverse: (text: string) => text.replace(/[a-zA-Z]/g, char => {
    const reverseMap: {
      [key: string]: string;
    } = {
      'a': 'ɐ',
      'b': 'q',
      'c': 'ɔ',
      'd': 'p',
      'e': 'ǝ',
      'f': 'ɟ',
      'g': 'ƃ',
      'h': 'ɥ',
      'i': 'ᴉ',
      'j': 'ɾ',
      'k': 'ʞ',
      'l': 'l',
      'm': 'ɯ',
      'n': 'u',
      'o': 'o',
      'p': 'd',
      'q': 'b',
      'r': 'ɹ',
      's': 's',
      't': 'ʇ',
      'u': 'n',
      'v': 'ʌ',
      'w': 'ʍ',
      'x': 'x',
      'y': 'ʎ',
      'z': 'z',
      'A': '∀',
      'B': 'ᗺ',
      'C': 'Ɔ',
      'D': 'ᗡ',
      'E': 'Ǝ',
      'F': 'ᖴ',
      'G': 'פ',
      'H': 'H',
      'I': 'I',
      'J': 'ſ',
      'K': 'ʞ',
      'L': '˥',
      'M': 'W',
      'N': 'N',
      'O': 'O',
      'P': 'Ԁ',
      'Q': 'Q',
      'R': 'ᴿ',
      'S': '𝒮',
      'T': '𝕋',
      'U': '𝕌',
      'V': '𝕍',
      'W': 'W',
      'X': 'X',
      'Y': '⅄',
      'Z': 'Z'
    };
    return reverseMap[char] || char;
  }),
  mirror: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const mirrorMap: {
      [key: string]: string;
    } = {
      'a': 'ɒ',
      'b': 'd',
      'c': 'ɔ',
      'd': 'b',
      'e': 'ɘ',
      'f': 'Ꮈ',
      'g': 'ǫ',
      'h': 'ʜ',
      'i': 'i',
      'j': 'ꞁ',
      'k': 'ʞ',
      'l': 'l',
      'm': 'm',
      'n': 'n',
      'o': 'o',
      'p': 'q',
      'q': 'p',
      'r': 'ɿ',
      's': 'ꙅ',
      't': 'ƚ',
      'u': 'u',
      'v': 'v',
      'w': 'w',
      'x': 'x',
      'y': 'ʏ',
      'z': 'z',
      'A': 'A',
      'B': 'ᙠ',
      'C': 'Ɔ',
      'D': 'ᗡ',
      'E': 'Ǝ',
      'F': 'ᖴ',
      'G': 'Ǫ',
      'H': 'H',
      'I': 'I',
      'J': 'Ⴑ',
      'K': 'ʞ',
      'L': '⅃',
      'M': 'M',
      'N': 'N',
      'O': 'O',
      'P': 'ꟼ',
      'Q': 'Ϙ',
      'R': 'ᴿ',
      'S': 'Ꙅ',
      'T': 'T',
      'U': 'U',
      'V': 'V',
      'W': 'W',
      'X': 'X',
      'Y': 'Y',
      'Z': 'Z',
      '0': '0',
      '1': '⇂',
      '2': 'ς',
      '3': 'Ɛ',
      '4': 'ㄣ',
      '5': 'ट',
      '6': '9',
      '7': 'ㄥ',
      '8': '8',
      '9': '6'
    };
    return mirrorMap[char] || char;
  }),
  negative: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    const negativeMap: {
      [key: string]: string;
    } = {
      'a': '🅰',
      'b': '🅱',
      'c': '🅲',
      'd': '🅳',
      'e': '🅴',
      'f': '🅵',
      'g': '🅶',
      'h': '🅷',
      'i': '🅸',
      'j': '🅹',
      'k': '🅺',
      'l': '🅻',
      'm': '🅼',
      'n': '🅽',
      'o': '🅾',
      'p': '🅿',
      'q': '🆀',
      'r': '🆁',
      's': '🆂',
      't': '🆃',
      'u': '🆄',
      'v': '🆅',
      'w': '🆆',
      'x': '🆇',
      'y': '🆈',
      'z': '🆉',
      'A': '🅰',
      'B': '🅱',
      'C': '🅲',
      'D': '🅳',
      'E': '🅴',
      'F': '🅵',
      'G': '🅶',
      'H': '🅷',
      'I': '🅸',
      'J': '🅹',
      'K': '🅺',
      'L': '🅻',
      'M': '🅼',
      'N': '🅽',
      'O': '🅾',
      'P': '🅿',
      'Q': '🆀',
      'R': '🆁',
      'S': '🆂',
      'T': '🆃',
      'U': '🆄',
      'V': '🆅',
      'W': '🆆',
      'X': '🆇',
      'Y': '🆈',
      'Z': '🆉',
      '0': '⓪',
      '1': '①',
      '2': '②',
      '3': '③',
      '4': '④',
      '5': '⑤',
      '6': '⑥',
      '7': '⑦',
      '8': '⑧',
      '9': '⑨'
    };
    return negativeMap[char] || char;
  }),
  fraktur: (text: string) => text.replace(/[a-zA-Z]/g, char => {
    const frakturMap: {
      [key: string]: string;
    } = {
      'a': '𝔞',
      'b': '𝔟',
      'c': '𝔠',
      'd': '𝔡',
      'e': '𝔢',
      'f': '𝔣',
      'g': '𝔤',
      'h': '𝔥',
      'i': '𝔦',
      'j': '𝔧',
      'k': '𝔨',
      'l': '𝔩',
      'm': '𝔪',
      'n': '𝔫',
      'o': '𝔬',
      'p': '𝔭',
      'q': '𝔮',
      'r': '𝔯',
      's': '𝔰',
      't': '𝔱',
      'u': '𝔲',
      'v': '𝔳',
      'w': '𝔴',
      'x': '𝔵',
      'y': '𝔶',
      'z': '𝔷',
      'A': '𝔄',
      'B': '𝔅',
      'C': 'ℭ',
      'D': '𝔇',
      'E': '𝔈',
      'F': '𝔉',
      'G': '𝔊',
      'H': 'ℌ',
      'I': 'ℑ',
      'J': '𝔍',
      'K': '𝔎',
      'L': '𝔏',
      'M': '𝔐',
      'N': '𝔑',
      'O': '𝔒',
      'P': '𝔓',
      'Q': '𝔔',
      'R': 'ℜ',
      'S': '𝔖',
      'T': '𝔗',
      'U': '𝔘',
      'V': '𝔙',
      'W': '𝔚',
      'X': '𝔛',
      'Y': '𝔜',
      'Z': 'ℨ'
    };
    return frakturMap[char] || char;
  }),
  wave: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    return char + '̃';
  }),
  cute: (text: string) => text.replace(/[a-zA-Z]/g, char => {
    const cuteMap: {
      [key: string]: string;
    } = {
      'a': 'α',
      'b': 'в',
      'c': 'ς',
      'd': '∂',
      'e': 'є',
      'f': 'ƒ',
      'g': 'g',
      'h': 'н',
      'i': 'ι',
      'j': 'נ',
      'k': 'к',
      'l': 'ℓ',
      'm': 'м',
      'n': 'η',
      'o': 'σ',
      'p': 'ρ',
      'q': 'q',
      'r': 'я',
      's': 'ѕ',
      't': 'т',
      'u': 'υ',
      'v': 'ν',
      'w': 'ω',
      'x': 'χ',
      'y': 'у',
      'z': 'z',
      'A': 'Α',
      'B': 'Β',
      'C': 'Ƈ',
      'D': 'Ð',
      'E': 'Є',
      'F': 'Ƒ',
      'G': 'G',
      'H': 'Ħ',
      'I': 'Ɨ',
      'J': 'J',
      'K': 'Ҝ',
      'L': 'Ł',
      'M': 'M',
      'N': 'Ň',
      'O': 'Ø',
      'P': 'P',
      'Q': 'Q',
      'R': 'R',
      'S': 'Ş',
      'T': 'Ŧ',
      'U': 'Ữ',
      'V': 'V',
      'W': 'W',
      'X': 'Ж',
      'Y': 'Ұ',
      'Z': 'Z'
    };
    return cuteMap[char] || char;
  }),
  dots: (text: string) => text.replace(/[a-zA-Z0-9]/g, char => {
    return char + '̇';
  })
};
const baseFontStyles = [{
  key: 'normal',
  name: 'Normal',
  preview: 'Hello World'
}, {
  key: 'bold',
  name: 'Bold',
  preview: '𝗛𝗲𝗹𝗹𝗼 𝗪𝗼𝗿𝗹𝗱'
}, {
  key: 'italic',
  name: 'Italic',
  preview: '𝘏𝘦𝘭𝘭𝘰 𝘞𝘰𝘳𝘭𝘥'
}, {
  key: 'cursive',
  name: 'Cursive',
  preview: '𝒽𝑒𝓁𝓁𝑜 𝓌𝑜𝓇𝘭𝒹'
}, {
  key: 'fancy',
  name: 'Small Caps',
  preview: 'ʜᴇʟʟᴏ ᴡᴏʀʟᴅ'
}, {
  key: 'spaced',
  name: 'Spaced',
  preview: 'H e l l o   W o r l d'
}];
const newFontStyles = [{
  key: 'circled',
  name: 'Circled',
  preview: 'Ⓗⓔⓛⓛⓞ Ⓦⓞⓡⓛⓓ'
}, {
  key: 'squared',
  name: 'Squared',
  preview: '🅷🅴🅻🅻🅾 🆆🅾🆁🅻🅳'
}, {
  key: 'underlined',
  name: 'Underlined',
  preview: 'H̲e̲l̲l̲o̲ W̲o̲r̲l̲d̲'
}, {
  key: 'double',
  name: 'Double Struck',
  preview: 'ℍ𝕖𝕝𝕝𝕠 𝕎𝕠𝕣𝕝𝕕'
}, {
  key: 'monospace',
  name: 'Monospace',
  preview: '𝙷𝚎𝚕𝚕𝚘 𝚆𝚘𝚛𝚕𝚍'
}, {
  key: 'strikethrough',
  name: 'Strikethrough',
  preview: 'H̶e̶l̶l̶o̶ W̶o̶r̶l̶d̶'
}, {
  key: 'bubble',
  name: 'Bubble',
  preview: 'Ⓗⓔⓛⓛⓞ Ⓦⓞⓡⓛⓓ'
}, {
  key: 'reverse',
  name: 'Reverse',
  preview: 'ɥǝllo ʍoɹlp'
}, {
  key: 'mirror',
  name: 'Mirror',
  preview: 'ʜɘllo woɿlb'
}, {
  key: 'negative',
  name: 'Negative',
  preview: '🅷🅴🅻🅻🅾 🆆🅾🆁🅻🅳'
}, {
  key: 'fraktur',
  name: 'Fraktur',
  preview: 'ℌ𝔢𝔩𝔩𝔬 𝔚𝔬𝔯𝔩𝔡'
}, {
  key: 'wave',
  name: 'Wave',
  preview: 'H̃ẽl̃l̃õ W̃õr̃l̃d̃'
}, {
  key: 'cute',
  name: 'Cute',
  preview: 'нєℓℓσ ωσяℓ∂'
}];
export const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onFontChange,
  bioText,
  setBioText
}) => {
  const [fontStyles, setFontStyles] = useState(baseFontStyles);
  const [isGenerating, setIsGenerating] = useState(false);
  const applyFont = (fontKey: string) => {
    if (bioText) {
      const transformer = fontTransforms[fontKey as keyof typeof fontTransforms];
      setBioText(transformer(bioText));
    }
    onFontChange(fontKey);
  };
  const generateNewFonts = async () => {
    setIsGenerating(true);

    // Quick generation for better user experience
    await new Promise(resolve => setTimeout(resolve, 200));

    // Randomly select 6 new font styles to replace the last 3 existing ones + add 3 more
    const shuffledNewFonts = [...newFontStyles].sort(() => Math.random() - 0.5);
    const selectedNewFonts = shuffledNewFonts.slice(0, 6);

    // Keep the first 3 base fonts and replace the others with new ones
    const updatedFontStyles = [...baseFontStyles.slice(0, 3), ...selectedNewFonts];
    setFontStyles(updatedFontStyles);
    setIsGenerating(false);
  };
  return <Card className="shadow-lg border-2 border-blue-200 dark:border-blue-600 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm relative overflow-hidden">
      {/* Pulsing highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-blue-400/10 animate-pulse"></div>
      
      {/* Spotlight indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 animate-pulse">
          Popular Choice!
        </span>
      </div>

      <CardHeader className="pb-4 border-b border-blue-100 dark:border-blue-700 relative z-10">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
              <Type className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                Font Styles
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 animate-bounce">
                  Transform Text!
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                Transform your text with unique fonts • Make it stand out
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {fontStyles.length} fonts
            </Badge>
            <Button onClick={generateNewFonts} disabled={isGenerating} variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 border-blue-200 dark:border-blue-600 my-[20px] bg-[#f8fdff]/[0.31]">
              {isGenerating ? <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </> : <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Fonts
                </>}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {fontStyles.map(style => <Button key={style.key} variant={selectedFont === style.key ? "default" : "outline"} onClick={() => applyFont(style.key)} className={`h-auto p-4 flex flex-col items-start text-left transition-all duration-200 ${selectedFont === style.key ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" : "hover:bg-blue-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"}`}>
              <span className="font-semibold text-sm mb-2">{style.name}</span>
              <span className="text-xs opacity-90 leading-relaxed">{style.preview}</span>
            </Button>)}
        </div>
      </CardContent>
    </Card>;
};