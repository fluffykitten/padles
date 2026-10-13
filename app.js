/**
 * Padles — Shelf / Section Board Application
 * Features Padlet-authentic Dark Post Composer, multi-tool attachments bar,
 * color & section selectors, and real-time live search integration.
 */

// Available Color Palettes for Cards
// Available Color Palettes for Cards (Picture 2: White + Pastel Red, Yellow, Green, Blue, Purple)
const PALETTES = [
  { id: 'white', name: 'White', hex: '#ffffff', dot: '#ffffff', cardBg: '#ffffff', border: '#e2e8f0', textColor: '#0f172a' },
  { id: 'red', name: 'Red', hex: '#ff5c5c', dot: '#ff5c5c', cardBg: '#ffe4e6', border: '#fecdd3', textColor: '#881337' },
  { id: 'yellow', name: 'Yellow', hex: '#fbbf24', dot: '#fbbf24', cardBg: '#fef9c3', border: '#fef08a', textColor: '#713f12' },
  { id: 'green', name: 'Green', hex: '#34d399', dot: '#34d399', cardBg: '#dcfce7', border: '#bbf7d0', textColor: '#14532d' },
  { id: 'blue', name: 'Blue', hex: '#38bdf8', dot: '#38bdf8', cardBg: '#e0f2fe', border: '#bae6fd', textColor: '#0c4a6e' },
  { id: 'purple', name: 'Purple', hex: '#a855f7', dot: '#a855f7', cardBg: '#f3e8ff', border: '#e9d5ff', textColor: '#581c87' }
];

// Padlet-Authentic 4 Signature Color Groups (Extracted via CDP from Live Padlet)
const TOOL_GROUPS = [
  {
    "id": "grape",
    "color": "grape",
    "tools": [
      {
        "id": "padlet",
        "name": "Padles",
        "testid": "attachAnotherPadletButton",
        "ariaLabel": "Attach another padlet",
        "colorClass": "grape",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 768 768\" height=\"24\" width=\"24\" version=\"1.1\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\">\n<g id=\"icomoon-ignore\">\n</g>\n<path d=\"M364.166 88.625c20.704 0.317 40.099 12.998 48.25 31.969l83.312 193.5 83.907-36.156c4.009-1.726 8.445-2.686 12.905-2.688h76.157c3.056 0.001 6.080 0.445 8.969 1.281 0.112 0.030 0.265 0.063 0.374 0.094 0.583 0.166 1.069 0.339 1.437 0.469 2.038 0.698 3.933 1.607 5.75 2.687 1.111 0.655 2.419 1.478 3.686 2.501 2.071 1.645 4.019 3.649 5.719 5.938 0.048 0.058 0.115 0.129 0.157 0.188l0.125 0.156 2.249 3.469 0.128 0.218c0.035 0.067 0.473 0.852 0.781 1.5l41.875 76.592c7.072 12.973 6.871 28.397-0.656 41.095-7.508 12.614-21.175 20.467-35.815 20.47-6.224-0.003-12.281-1.392-17.907-4.064l-42.217-20.092-90.938 142.592-53.936 94.125c-10.509 21.133-32.096 34.899-56.563 34.909-2.352 0-4.745-0.115-7.094-0.374l-6.998-1.19-64.157-14.624-64.126 14.624c-4.582 1.034-9.344 1.565-14.063 1.565-22.678-0.007-42.862-11.821-54.094-30.346l-0.125-0.217-0.062-0.064c-0.262-0.419-0.528-0.915-0.812-1.437l-193.75-338.062-7.562-12.812 0.032-0.031c-0.068-0.11-0.123-0.229-0.188-0.344l-0.062 0.031c-0.123-0.214-0.194-0.472-0.313-0.687-0.069-0.146-0.155-0.286-0.219-0.438-7.378-13.684-7.267-29.824 0.563-43.313 8.005-13.751 22.76-22.399 38.657-22.406 7.534 0.001 15 1.976 21.625 5.625l142.719 78.656 83.063-192.969c8.169-18.907 27.542-31.619 48.249-31.937h0.97zM265.603 620.188l0.125 0.407c2.495 10.899 13.357 17.75 24.281 15.28l62.406-14.188-9.655-120.938-119.189-35.187 42.032 154.627zM384.605 500.749l-9.689 120.938 62.471 14.188c10.928 2.471 21.772-4.396 24.25-15.28l0.125-0.439 42-154.563-119.156 35.156zM512.729 353.657l36.032 83.623 1.718 5.187c0.857 3.517 1.126 7.165 0.781 10.784l-1.001 5.404-7.155 26.282 106.342-166.656h-54.717l-82 35.376zM66.479 272.813c-0.32 0.328-0.459 0.676-0.5 0.906-0.023 0.139-0.064 0.452 0.25 1l115.75 201.938-4.875-18c-1.925-7.078-1.365-14.643 1.531-21.376l36.125-84.061-146.375-80.688c-0.554-0.304-0.86-0.274-1-0.25-0.232 0.046-0.583 0.203-0.906 0.531zM223.573 441.625l118.936 16.999 9.939-316.374-128.875 299.376zM384.761 458.624l118.999-16.999-128.873-299.407 9.875 316.405zM662.887 369.437l37.124 17.626-28-51.28-9.123 33.655z\"></path>\n</svg>"
      },
      {
        "id": "upload",
        "name": "Upload",
        "testid": "contentPickerSourceUploadButton",
        "ariaLabel": "Upload a file",
        "colorClass": "grape",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M8.333 2.667c-1.654 0-3 1.346-3 3v20.667c0 1.654 1.346 3 3 3h15v-2h-15c-.551 0-1-.449-1-1V5.667c0-.551.449-1 1-1H16v5.667c0 1.654 1.346 3 3 3h5.667v4.233c.304-.145.641-.233 1-.233s.696.088 1 .233v-5.233a1 1 0 0 0-.293-.707L17.707 2.96A1 1 0 0 0 17 2.667zM18 6.081l5.253 5.253H19c-.551 0-1-.449-1-1zm7.667 12.586a1 1 0 0 0-.707.293l-3.333 3.333a1 1 0 0 0 1.414 1.414l1.626-1.626v7.586a1 1 0 1 0 2 0v-7.586l1.626 1.626a.999.999 0 1 0 1.414-1.414l-3.333-3.333a1 1 0 0 0-.707-.293\"></path></svg>"
      },
      {
        "id": "link",
        "name": "Link",
        "testid": "contentPickerSourceLinkButton",
        "ariaLabel": "Attach a link",
        "colorClass": "grape",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M8.667 8.667c-4.038 0-7.333 3.295-7.333 7.333s3.295 7.333 7.333 7.333h3a1 1 0 0 0 .936-.614 1 1 0 0 0-.936-1.386h-3c-2.958 0-5.333-2.376-5.333-5.333s2.376-5.333 5.333-5.333h3a1 1 0 0 0 .936-.614 1 1 0 0 0-.936-1.386zm11.666 0a1 1 0 0 0-.937.614q-.078.185-.077.386a.8.8 0 0 0 .077.386 1 1 0 0 0 .55.542c.123.05.255.074.387.072h3c2.958 0 5.333 2.376 5.333 5.333s-2.376 5.333-5.333 5.333h-3a1 1 0 0 0-.937.614q-.078.185-.077.386a.8.8 0 0 0 .077.386 1 1 0 0 0 .55.542c.123.05.255.074.387.072h3c4.038 0 7.333-3.295 7.333-7.333s-3.295-7.333-7.333-7.333zM7.667 15a1 1 0 0 0-.936.614A1 1 0 0 0 7.667 17h16.667a1 1 0 0 0 .937-.614q.077-.185.077-.386a.8.8 0 0 0-.077-.386 1 1 0 0 0-.55-.542 1 1 0 0 0-.387-.072z\"></path></svg>"
      }
    ]
  },
  {
    "id": "oceanic",
    "color": "oceanic",
    "tools": [
      {
        "id": "camera",
        "name": "Camera",
        "testid": "contentPickerSourceCameraButton",
        "ariaLabel": "Take a photo",
        "colorClass": "oceanic",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M12.958 4c-1.56 0-2.957.995-3.466 2.47L8.963 8H6.071a4.087 4.087 0 0 0-4.072 4.072v11.19a4.09 4.09 0 0 0 4.072 4.073h19.19a4.09 4.09 0 0 0 4.073-4.073v-11.19A4.09 4.09 0 0 0 25.261 8h-2.279l-.529-1.53-.001-.001A3.67 3.67 0 0 0 18.987 4zm0 2h6.03a1.66 1.66 0 0 1 1.576 1.122l.762 2.204a1 1 0 0 0 .945.673h2.991c1.156 0 2.072.916 2.073 2.073v11.189a2.06 2.06 0 0 1-2.073 2.073H6.072A2.06 2.06 0 0 1 4 23.261v-11.19c0-1.156.915-2.072 2.072-2.072h3.605a1 1 0 0 0 .945-.673l.76-2.204A1.66 1.66 0 0 1 12.958 6M16 11.333c-3.302 0-6 2.698-6 6s2.698 6 6 6 6-2.698 6-6-2.698-6-6-6m0 2c2.221 0 4 1.779 4 4s-1.779 4-4 4-4-1.779-4-4 1.779-4 4-4\"></path></svg>"
      },
      {
        "id": "video",
        "name": "Video recorder",
        "testid": "contentPickerSourceVideoButton",
        "ariaLabel": "Record a video",
        "colorClass": "oceanic",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M7 6a4.35 4.35 0 0 0-4.333 4.333v11.333A4.35 4.35 0 0 0 7 25.999h11.333a4.35 4.35 0 0 0 4.333-4.333v-.9l5.152 3.091a.999.999 0 0 0 1.514-.859v-14a1 1 0 0 0-.304-.718 1.01 1.01 0 0 0-.727-.282 1 1 0 0 0-.484.142l-5.152 3.091v-.9a4.35 4.35 0 0 0-4.333-4.333H6.999zm0 2h11.333c1.3 0 2.333 1.033 2.333 2.333v11.333c0 1.3-1.033 2.333-2.333 2.333H7a2.32 2.32 0 0 1-2.333-2.333V10.333C4.667 9.033 5.7 8 7 8m20.333 2.767v10.466l-4.667-2.799v-4.867z\"></path></svg>"
      },
      {
        "id": "audio",
        "name": "Audio recorder",
        "testid": "contentPickerSourceAudioButton",
        "ariaLabel": "Record an audio",
        "colorClass": "oceanic",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M16 1.333c-3.302 0-6 2.698-6 6v10c0 3.302 2.698 6 6 6s6-2.698 6-6v-10c0-3.302-2.698-6-6-6m0 2c2.221 0 4 1.779 4 4v10c0 2.221-1.779 4-4 4s-4-1.779-4-4v-10c0-2.221 1.779-4 4-4M6.984 13.986A1 1 0 0 0 6 15v2.333c0 5.174 3.956 9.445 9 9.949v3.051a1 1 0 0 0 .614.937 1.003 1.003 0 0 0 1.314-.55c.049-.123.074-.255.072-.387v-3.051c5.044-.504 9-4.775 9-9.949V15a1 1 0 0 0-.614-.937A1 1 0 0 0 24 15v2.333a7.98 7.98 0 0 1-7.882 7.993 1 1 0 0 0-.243 0A7.98 7.98 0 0 1 8 17.333V15a1 1 0 0 0-.293-.722q-.143-.143-.332-.219a.8.8 0 0 0-.391-.073\"></path></svg>"
      },
      {
        "id": "screenrecord",
        "name": "Screen recorder",
        "testid": "contentPickerSourceScreenRecordButton",
        "ariaLabel": "Record your screen",
        "colorClass": "oceanic",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M5.667 4.667A3.68 3.68 0 0 0 2 8.334v15.333a3.68 3.68 0 0 0 3.667 3.667h20.667a3.68 3.68 0 0 0 3.667-3.667V8.334a3.68 3.68 0 0 0-3.667-3.667zm0 2h20.667c.932 0 1.667.735 1.667 1.667v15.333c0 .932-.735 1.667-1.667 1.667H5.667A1.653 1.653 0 0 1 4 23.667V8.334c0-.932.735-1.667 1.667-1.667m7 6.666A.667.667 0 0 0 12 14v4a.667.667 0 0 0 1.334 0v-.667h.667l.799 1.066a.668.668 0 0 0 1.067-.8l-.569-.758c.426-.367.702-.904.702-1.509 0-1.103-.897-2-2-2h-1.333zm5.333 0a.667.667 0 0 0-.667.667v4c0 .368.299.667.667.667h2a.667.667 0 0 0 0-1.334h-1.333v-.667h1a.667.667 0 0 0 0-1.334h-1v-.667H20a.667.667 0 0 0 0-1.334h-2zm5.529 0c-1.21 0-2.195 1.196-2.195 2.667s.985 2.667 2.195 2.667a1.95 1.95 0 0 0 1.73-1.04.667.667 0 0 0-1.198-.586.62.62 0 0 1-.533.293c-.459 0-.862-.623-.862-1.333s.403-1.333.862-1.333c.349 0 .506.249.538.303a.667.667 0 0 0 1.192-.596 1.95 1.95 0 0 0-1.73-1.04zM8.667 14a2 2 0 1 0 .001 4.001A2 2 0 0 0 8.667 14m4.666.667H14a.668.668 0 0 1 0 1.334h-.667v-1.333z\"></path></svg>"
      },
      {
        "id": "draw",
        "name": "Draw",
        "testid": "contentPickerSourceDrawButton",
        "ariaLabel": "Draw something",
        "colorClass": "oceanic",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M28.967 3.314a1 1 0 0 0-.862.573l-2.922 5.844-5.471-2.189.909-2.91a1 1 0 0 0-.144-.903 1 1 0 0 0-.818-.408 1 1 0 0 0-.947.715l-3.18 10.176c-1.507.23-2.827.769-3.767 1.716-1.181 1.189-1.898 2.763-2.392 4.46-.658 2.262-1.272 4.532-3.139 6.28H3a1 1 0 0 0-.716.288 1.004 1.004 0 0 0 0 1.424 1 1 0 0 0 .716.288h7.333c4.1 0 7.258-.593 9.506-1.915s3.494-3.498 3.494-6.085c0-.704-.199-1.35-.404-1.988q.054-.073.094-.156l3.466-6.931q.095-.133.143-.289l3.262-6.522a1.001 1.001 0 0 0-.927-1.466zm-9.854 6.142 5.173 2.069-2.512 5.022c-1.024-1.267-2.464-2.094-4.143-2.35zM16.667 16a4.65 4.65 0 0 1 4.667 4.667c0 2.006-.755 3.329-2.507 4.359s-4.594 1.641-8.494 1.641H8.918c1.34-1.885 1.871-3.988 2.375-5.72.439-1.509 1.056-2.768 1.892-3.611S15.057 16 16.667 16\"></path></svg>"
      }
    ]
  },
  {
    "id": "park",
    "color": "park",
    "tools": [
      {
        "id": "poll",
        "name": "Poll",
        "testid": "makeAPollButton",
        "ariaLabel": "Make a poll",
        "colorClass": "park",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M16 2.665c-7.352 0-13.333 5.982-13.333 13.333 0 2.184.575 4.225 1.508 6.044L2.73 27.217c-.337 1.202.852 2.391 2.055 2.055l5.178-1.445c1.818.931 3.856 1.505 6.038 1.505 7.352 0 13.333-5.981 13.333-13.333S23.353 2.666 16.001 2.666zm0 2c6.271 0 11.333 5.062 11.333 11.333S22.27 27.331 16 27.331c-2.001 0-3.873-.52-5.505-1.43a1 1 0 0 0-.755-.09l-4.924 1.374 1.375-4.922a1 1 0 0 0-.09-.756 11.26 11.26 0 0 1-1.434-5.509A11.32 11.32 0 0 1 16 4.665M20.667 10c-.737 0-1.333.597-1.333 1.333v9.333a1.333 1.333 0 1 0 2.666 0v-9.333c0-.737-.597-1.333-1.333-1.333m-9.334 2.667c-.737 0-1.333.597-1.333 1.333v6.667a1.333 1.333 0 1 0 2.666 0V14c0-.737-.597-1.333-1.333-1.333M16 15.333c-.737 0-1.333.597-1.333 1.333v4a1.333 1.333 0 1 0 2.666 0v-4c0-.737-.597-1.333-1.333-1.333\"></path></svg>"
      },
      {
        "id": "aiimagesearch",
        "name": "AI image",
        "testid": "contentPickerSourceAiImageSearchButton",
        "ariaLabel": "Use AI Art Generator",
        "colorClass": "park",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 768 768\" height=\"24\" width=\"24\" version=\"1.1\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\">\n<g id=\"icomoon-ignore\">\n</g>\n<path d=\"M296.317 152.375c13.246 0.007 23.994 10.754 24 24-0.007 13.247-10.754 23.993-24 24h-128c-22.085 0.004-39.995 17.915-40 40v359.814c0 2.246 0.205 4.445 0.563 6.592l175.937-164.157c35.593-33.219 91.401-31.241 124.531 4.438l146.249 157.501c0.157-1.44 0.281-2.896 0.281-4.375v-153.814c0.003-13.251 10.749-24 24-24 13.248 0.007 23.997 10.752 24 24v153.814c-0.003 48.592-39.408 87.991-88 88h-367.562c-48.595-0.007-87.995-39.408-88-88v-359.814c0.004-48.595 39.405-87.996 88-88h128zM394.16 479.719c-15.059-16.208-40.416-17.123-56.592-2.032l-173.814 162.189c1.495 0.169 3.022 0.313 4.562 0.313h367.562c2.282-0.003 4.512-0.26 6.688-0.627l-148.406-159.843z\"></path>\n<path d=\"M533.287 79.813c9.127 0 18.278 4.876 22.375 14.719l27.344 66.125 1.75 3.687c4.474 8.32 11.815 14.888 20.781 18.5l67.155 26.937c19.99 8.066 19.99 35.972 0 44l-67.155 27.032-3.718 1.688c-8.458 4.407-15.143 11.634-18.813 20.469l-27.344 66.094-1.783 3.436c-9.885 16.148-35.225 15.005-42.874-3.436l-27.436-66.094c-4.154-10.054-12.285-18.028-22.535-22.156l-67.091-27.032c-19.988-8.067-19.988-35.971 0-44l67.091-26.937c10.211-4.091 18.343-12.096 22.535-22.187l27.436-66.125c4.073-9.842 13.155-14.718 22.282-14.719zM527.879 179.063c-8.032 19.328-22.589 35.068-40.906 44.625l-8.092 3.719-10.969 4.406 11.063 4.469c21.981 8.856 39.728 26.131 48.905 48.281l5.437 13 5.344-12.969 0.032-0.031 3.843-8.063c8.432-15.634 21.367-28.339 37.063-36.531l8.096-3.719 10.999-4.438-11.095-4.438c-21.997-8.863-39.766-26.168-48.938-48.344l-5.344-13-5.437 13.031z\"></path>\n<path d=\"M243.941 272.719c25.293 0.005 45.781 20.491 45.781 45.75-0.003 25.256-20.49 45.745-45.781 45.748-25.291-0.003-45.809-20.493-45.812-45.748 0-25.259 20.52-45.745 45.812-45.75z\"></path>\n</svg>"
      },
      {
        "id": "aitalk",
        "name": "AI speech",
        "testid": "contentPickerSourceAiTalkButton",
        "ariaLabel": "Use AI Speech Generator",
        "colorClass": "park",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M17.667 2.667A2.35 2.35 0 0 0 15.334 5v10a1 1 0 0 0 .618.923 1 1 0 0 0 1.09-.216l3.04-3.04h7.586a2.35 2.35 0 0 0 2.333-2.333V5.001a2.35 2.35 0 0 0-2.333-2.333h-10zm0 2h10A.32.32 0 0 1 28 5v5.333a.32.32 0 0 1-.333.333h-8a1 1 0 0 0-.707.293l-1.626 1.626V4.999c0-.196.137-.333.333-.333zm-8.334 5.498c-1.458 0-2.679.583-3.466 1.469s-1.159 2.029-1.159 3.158.371 2.27 1.159 3.156 2.008 1.469 3.466 1.469c2.543 0 4.625-2.082 4.625-4.625s-2.082-4.626-4.625-4.626zm0 2c1.462 0 2.625 1.165 2.625 2.626s-1.163 2.625-2.625 2.625c-.958 0-1.55-.323-1.971-.797s-.654-1.144-.654-1.828.233-1.355.654-1.828 1.013-.798 1.971-.798m-5.056 8.502c-1.208 0-2.319.917-2.319 2.173v2.055c0 1.379.959 2.52 2.272 3.264s3.062 1.176 5.102 1.176 3.789-.431 5.103-1.176 2.273-1.886 2.273-3.264V22.84c0-1.255-1.111-2.173-2.32-2.173zm0 2h10.111c.249 0 .32.133.32.173v2.055c0 .421-.333 1-1.259 1.525s-2.366.915-4.117.915-3.188-.39-4.115-.915c-.926-.525-1.259-1.103-1.259-1.525V22.84c0-.04.071-.173.319-.173\"></path></svg>"
      },
      {
        "id": "photoalbum",
        "name": "Photo album",
        "testid": "contentPickerSourcePhotoAlbumButton",
        "ariaLabel": "Choose photos from your device",
        "colorClass": "park",
        "isNew": true,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M18.331 11.995a1.664 1.664 0 1 0 0-3.328 1.664 1.664 0 0 0 0 3.328M8.333 4A4.333 4.333 0 0 0 4 8.333v12a4.333 4.333 0 0 0 4.333 4.333h12a4.333 4.333 0 0 0 4.333-4.333v-12A4.333 4.333 0 0 0 20.333 4zM6 8.333A2.333 2.333 0 0 1 8.333 6h12a2.333 2.333 0 0 1 2.333 2.333v12c0 .308-.06.602-.168.872l-6.116-5.721a3 3 0 0 0-4.099 0l-6.115 5.721A2.3 2.3 0 0 1 6 20.334zm9.016 8.611 6.007 5.619a2.3 2.3 0 0 1-.689.103h-12q-.362-.001-.69-.104l6.006-5.619a1 1 0 0 1 1.366 0zM11.667 28a4.33 4.33 0 0 1-3.652-2h12.986a5 5 0 0 0 5-5V8.014a4.33 4.33 0 0 1 2 3.652v9.333a7 7 0 0 1-7 7h-9.333z\"></path></svg>"
      }
    ]
  },
  {
    "id": "tangerine",
    "color": "tangerine",
    "tools": [
      {
        "id": "imagesearch",
        "name": "Image search",
        "testid": "contentPickerSourceImageSearchButton",
        "ariaLabel": "Search for an image",
        "colorClass": "tangerine",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M28 8.333A4.333 4.333 0 0 0 23.667 4H8.334a4.333 4.333 0 0 0-4.333 4.333v6.01a7.3 7.3 0 0 1 2-1.176V8.334a2.333 2.333 0 0 1 2.333-2.333h15.333A2.333 2.333 0 0 1 26 8.334v15.333c0 .278-.049.545-.138.793l-7.763-7.602-.171-.155a3 3 0 0 0-2.991-.507c.345.568.616 1.186.797 1.842a1 1 0 0 1 .965.25l7.741 7.582a2.3 2.3 0 0 1-.774.131h-6.367l.683.683c.371.371.591.835.66 1.317h5.024a4.333 4.333 0 0 0 4.333-4.333V8.335zm-4.661 3.336a3.003 3.003 0 1 0-6.006 0 3.003 3.003 0 0 0 6.006 0m-4.006 0a1.003 1.003 0 1 1 2.006 0 1.003 1.003 0 0 1-2.006 0m-6.066 12.184a6 6 0 1 0-1.527 1.301l3.886 3.886a.999.999 0 1 0 1.414-1.414l-3.774-3.774zm-4.6.147a4 4 0 1 1 0-8 4 4 0 0 1 0 8\"></path></svg>"
      },
      {
        "id": "gifsearch",
        "name": "GIF",
        "testid": "contentPickerSourceGifSearchButton",
        "ariaLabel": "Search for a GIF",
        "colorClass": "tangerine",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 768 768\" height=\"24\" width=\"24\" version=\"1.1\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\">\n<g id=\"icomoon-ignore\">\n</g>\n<path d=\"M197.653 560c90.893 0 144.482-54.535 144.482-146.608v-10.388c0-13.456-8.263-21.955-21.248-21.955h-100.57c-11.804 0-20.303 7.555-20.303 18.649 0 11.098 8.499 18.649 20.303 18.649h79.324v6.141c0 57.13-41.551 96.32-101.988 96.32-69.408 0-112.376-53.116-112.376-138.816 0-84.282 42.259-134.803 112.376-134.803 42.967 0 76.019 20.775 93.489 60.201 5.43 12.512 11.804 17.707 22.192 17.707 11.803 0 19.357-7.791 19.357-19.359 0-5.194-0.47-10.624-3.305-17.942-18.413-47.689-69.407-79.796-131.733-79.796-95.378 0-156.051 67.756-156.051 174.23 0 108.361 60.91 177.769 156.051 177.769z\"></path>\n<path d=\"M422.752 557.639c12.985 0 21.248-8.499 21.248-21.956v-303.367c0-13.457-8.263-21.955-21.248-21.955-12.982 0-21.245 8.499-21.245 21.955v303.367c0 13.456 8.263 21.956 21.245 21.956z\"></path>\n<path d=\"M536.186 557.639c12.985 0 21.248-8.499 21.248-21.956v-128.902h134.332c11.801 0 20.067-7.552 20.067-18.887 0-11.331-8.266-18.887-20.067-18.887h-134.332v-117.097h147.552c12.041 0 20.304-7.791 20.304-19.123s-8.263-19.123-20.304-19.123h-168.8c-12.983 0-21.248 8.499-21.248 21.956v300.062c0 13.456 8.266 21.956 21.248 21.956z\"></path>\n</svg>"
      },
      {
        "id": "videosearch",
        "name": "YouTube",
        "testid": "contentPickerSourceVideoSearchButton",
        "ariaLabel": "Search on YouTube",
        "colorClass": "tangerine",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M15.905 5.667c-4.235 0-8.17.302-10.415.771l-.014.004c-1.692.379-3.284 1.591-3.62 3.488l-.001.008c-.258 1.529-.521 3.523-.521 6.396 0 2.867.264 4.808.59 6.418.344 1.841 1.9 3.09 3.617 3.474l.025.007c2.343.462 6.167.768 10.402.768s8.061-.307 10.405-.768l.025-.007c1.692-.379 3.284-1.591 3.62-3.488l.003-.014c.254-1.561.582-3.552.647-6.43v-.022c0-2.879-.329-4.885-.651-6.474-.341-1.845-1.899-3.097-3.618-3.482a1 1 0 0 0-.079-.014c-2.287-.321-6.177-.634-10.413-.634zm0 2c4.107 0 7.913.308 10.073.608 1.062.244 1.905.986 2.072 1.885l.003.017c.31 1.531.612 3.351.613 6.079-.062 2.737-.365 4.573-.618 6.134-.173.972-.986 1.632-2.078 1.88-2.099.412-5.874.729-10.001.729s-7.902-.319-10-.731c-1.066-.242-1.913-.986-2.079-1.888l-.004-.017c-.307-1.514-.551-3.279-.551-6.031 0-2.748.244-4.585.491-6.055.172-.975.987-1.636 2.082-1.884 1.943-.405 5.867-.728 9.999-.728zm-2.264 3.015c-1.195.039-2.307 1.001-2.307 2.309v6.02c0 1.743 1.978 2.873 3.492 2.018v-.001l5.327-3.009c1.525-.862 1.525-3.175 0-4.037l-5.327-3.009a2.25 2.25 0 0 0-1.185-.29zm.007 1.972q.091.004.193.06l5.327 3.01c.271.153.271.401 0 .553l-5.327 3.009c-.268.151-.508.01-.508-.276v-6.02c0-.143.06-.25.154-.302a.3.3 0 0 1 .161-.035z\"></path></svg>"
      },
      {
        "id": "audiosearch",
        "name": "Spotify",
        "testid": "contentPickerSourceAudioSearchButton",
        "ariaLabel": "Search on Spotify",
        "colorClass": "tangerine",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M16 2.667C8.648 2.667 2.667 8.648 2.667 16S8.648 29.333 16 29.333 29.333 23.352 29.333 16 23.352 2.667 16 2.667m0 2c6.271 0 11.333 5.062 11.333 11.333S22.271 27.333 16 27.333 4.667 22.271 4.667 16 9.729 4.667 16 4.667m-1.931 5.971q-.714.01-1.426.068a20.4 20.4 0 0 0-3.755.667 1 1 0 0 0-.629.464 1 1 0 0 0-.103.775 1 1 0 0 0 .486.613 1 1 0 0 0 .778.076 18.47 18.47 0 0 1 13.422 1.417 1.003 1.003 0 0 0 1.364-.417 1 1 0 0 0-.128-1.115 1 1 0 0 0-.311-.243 20.4 20.4 0 0 0-9.697-2.305zm.137 4.035q-.584.004-1.167.048a17 17 0 0 0-3.074.514 1.01 1.01 0 0 0-.633.457 1.005 1.005 0 0 0 .064 1.129.99.99 0 0 0 .68.382c.133.015.268.003.397-.035a15.18 15.18 0 0 1 10.755 1.161 1 1 0 0 0 .771.074 1 1 0 0 0 .593-.499 1 1 0 0 0-.139-1.116 1 1 0 0 0-.315-.24 17.1 17.1 0 0 0-7.934-1.878zm.159 4.005a14 14 0 0 0-3.245.375 1 1 0 0 0-.782.814 1 1 0 0 0 .846 1.156c.132.019.267.01.396-.024a11.9 11.9 0 0 1 7.969.888q.179.087.377.101c.198.014.263-.009.387-.052a1.01 1.01 0 0 0 .575-.506 1 1 0 0 0 .048-.764 1.01 1.01 0 0 0-.506-.575 13.8 13.8 0 0 0-6.068-1.413z\"></path></svg>"
      },
      {
        "id": "websearch",
        "name": "Web search",
        "testid": "contentPickerSourceWebSearchButton",
        "ariaLabel": "Search on the web",
        "colorClass": "tangerine",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M4.588 13.274a6.567 6.567 0 0 0 8.31 10.095l5.675 5.675a1.03 1.03 0 0 0 1.558-1.342l-.1-.116-5.623-5.625a6.569 6.569 0 0 0-9.82-8.687M16.034 2.665c-6.341 0-11.648 4.425-13.001 10.356q.282-.359.612-.689a7.9 7.9 0 0 1 2.367-1.631 11.36 11.36 0 0 1 5.861-5.248l-.142.232c-.717 1.191-1.295 2.682-1.7 4.372a8 8 0 0 1 1.954.454c.842-3.503 2.431-5.846 4.049-5.846l.154.007c1.687.154 3.317 2.824 4.074 6.661l-6.663-.001a7.9 7.9 0 0 1 2.067 1.999l4.897.002c.091.854.14 1.747.14 2.667 0 1.413-.115 2.76-.32 4h-3.527a8 8 0 0 1-.399 1.121l-.172.362-.163.306.212.209h3.619c-.269.998-.601 1.89-.975 2.646l1.474 1.477c.656-1.144 1.189-2.545 1.572-4.122l3.63-.001a11.4 11.4 0 0 1-4.978 4.345l.3.299.166.187c.294.394.46.832.504 1.27 4.561-2.118 7.725-6.74 7.725-12.101 0-7.365-5.971-13.335-13.335-13.335zm-3.616 12.067a4.505 4.505 0 1 1-6.372 6.372 4.505 4.505 0 1 1 6.372-6.372m10.159-1.399 4.477-.001.01.04c.2.843.306 1.723.306 2.627 0 1.408-.257 2.756-.726 4L22.413 20a27 27 0 0 0 .291-4.001c0-.912-.043-1.804-.127-2.667zm-2.384-7.881.031.012a11.37 11.37 0 0 1 6.144 5.869l-4.064-.001c-.418-2.337-1.147-4.371-2.11-5.88z\"></path></svg>"
      },
      {
        "id": "locationsearch",
        "name": "Location",
        "testid": "contentPickerSourceLocationSearchButton",
        "ariaLabel": "Add a location",
        "colorClass": "tangerine",
        "isNew": false,
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"fill-current\" viewBox=\"0 0 32 32\" height=\"24\" width=\"24\" aria-hidden=\"true\" alt=\"\" style=\"overflow: visible;\"><path d=\"M16 2.667c-5.143 0-9.333 4.19-9.333 9.333 0 2.309.848 4.429 2.24 6.057v.001h.001s3.859 4.519 5.292 5.887c.999.953 2.6.953 3.6 0 1.62-1.545 5.292-5.885 5.294-5.888l.001-.003a9.3 9.3 0 0 0 2.238-6.055c0-5.143-4.19-9.333-9.333-9.333zm0 2A7.32 7.32 0 0 1 23.333 12a7.3 7.3 0 0 1-1.76 4.758v.001h-.001s-3.817 4.465-5.152 5.738a.587.587 0 0 1-.84 0c-1.103-1.052-5.151-5.736-5.154-5.739l-.001-.003A7.28 7.28 0 0 1 8.667 12 7.32 7.32 0 0 1 16 4.667M16 8c-1.25 0-2.314.505-2.997 1.273S12 11.027 12 12s.319 1.958 1.003 2.727S14.75 16 16 16s2.314-.505 2.997-1.273S20 12.973 20 12s-.319-1.958-1.003-2.727S17.25 8 16 8m0 2c.75 0 1.186.245 1.503.602S18 11.473 18 12s-.181 1.042-.497 1.398c-.317.356-.753.602-1.503.602s-1.186-.245-1.503-.602C14.18 13.042 14 12.527 14 12s.181-1.042.497-1.398C14.814 10.246 15.25 10 16 10m-7.486 9.628c-3.03.875-5.181 2.341-5.181 4.372 0 3.501 6.372 5.333 12.667 5.333S28.667 27.501 28.667 24c0-2.031-2.15-3.495-5.178-4.371-.385.437-.913 1.034-1.493 1.681 2.951.694 4.672 1.817 4.672 2.69 0 1.359-4.155 3.333-10.667 3.333S5.334 25.359 5.334 24c0-.873 1.724-1.999 4.68-2.693-.578-.643-1.109-1.24-1.499-1.68z\"></path></svg>"
      }
    ]
  }
];

// Flattened tools list for lookup compatibility
const ALL_TOOLS = TOOL_GROUPS.flatMap(g => g.tools);

class PadlesShelfApp {
  constructor() {
    this.storageKey = 'padles_board_exact_v1';
    this.sectionsTrack = document.getElementById('sectionsTrack');
    this.postModal = document.getElementById('composerCardWrapper');
    this.composerCardWrapper = this.postModal;
    this.editPostModalOverlay = document.getElementById('editPostModalOverlay');
    this.composerCard = document.getElementById('composerCard');
    this.titleInput = document.getElementById('composerTitleInput');
    this.bodyInput = document.getElementById('composerBodyInput');
    this.publishBtn = document.getElementById('publishBtn');
    this.colorPickerPill = document.getElementById('colorPickerPill');
    this.sectionSelectorPill = document.getElementById('sectionSelectorPill');
    this.currentColorDot = document.getElementById('currentColorDot');
    this.currentColorLabel = document.getElementById('currentColorLabel');
    this.currentSectionLabel = document.getElementById('currentSectionLabel');
    this.colorPaletteDropdown = document.getElementById('colorSelectPopover');
    this.activeAttachmentPreview = document.getElementById('activeAttachmentPreview');
    this.previewTypeBadge = document.getElementById('previewTypeBadge');
    this.previewTitleText = document.getElementById('previewTitleText');
    this.removeAttachmentBtn = document.getElementById('removeAttachmentBtn');

    // Color Popover (Picture 2)
    this.colorSelectPopover = document.getElementById('colorSelectPopover');
    this.colorOptionsList = document.getElementById('colorOptionsList');

    // Section Popover (Picture 3)
    this.sectionSelectPopover = document.getElementById('sectionSelectPopover');
    this.sectionOptionsList = document.getElementById('sectionOptionsList');
    this.popoverNewSectionBtn = document.getElementById('popoverNewSectionBtn');

    // Post Fields Modal (Picture 4)
    this.postFieldsModal = document.getElementById('postFieldsModal');
    this.composerFieldsBtn = document.getElementById('composerFieldsBtn');
    this.closePostFieldsBtn = document.getElementById('closePostFieldsBtn');
    this.addCustomFieldBtn = document.getElementById('addCustomFieldBtn');

    // Multiple Drafts Dock Elements
    this.dockableModalsContainer = document.getElementById('dockableModalsContainer');
    this.dockedTabsTrack = document.getElementById('dockedTabsTrack');
    this.dockBulkActionWrapper = document.getElementById('dockBulkActionWrapper');
    this.dockBulkActionBtn = document.getElementById('dockBulkActionBtn');
    this.draftsBulkMenu = document.getElementById('draftsBulkMenu');
    this.bulkPublishAllBtn = document.getElementById('bulkPublishAllBtn');
    this.bulkDeleteAllBtn = document.getElementById('bulkDeleteAllBtn');
    this.expandModalBtn = document.getElementById('expandModalBtn');
    this.minimizeModalBtn = document.getElementById('minimizeModalBtn');
    this.schedulePostBtn = document.getElementById('schedulePostBtn');

    // Search Submodal
    this.searchAttachmentModal = document.getElementById('searchAttachmentModal');
    this.mediaQueryInput = document.getElementById('mediaQueryInput');
    this.mediaSearchResults = document.getElementById('mediaSearchResults');

    // Top Header Search
    this.searchOverlay = document.getElementById('searchOverlay');
    this.boardSearchInput = document.getElementById('boardSearchInput');
    this.toastEl = document.getElementById('toast');

    // Supabase Cloud Backend & Presence Elements
    this.backend = window.padlesBackend || null;
    this.cloudSyncBtn = document.getElementById('cloudSyncBtn');
    this.cloudStatusDot = document.getElementById('cloudStatusDot');
    this.cloudStatusText = document.getElementById('cloudStatusText');
    this.collaboratorsStrip = document.getElementById('collaboratorsStrip');
    this.cloudSettingsModal = document.getElementById('cloudSettingsModal');
    this.closeCloudSettingsBtn = document.getElementById('closeCloudSettingsBtn');
    this.cloudConfigForm = document.getElementById('cloudConfigForm');
    this.supabaseUrlInput = document.getElementById('supabaseUrlInput');
    this.supabaseKeyInput = document.getElementById('supabaseKeyInput');
    this.supabaseBoardIdInput = document.getElementById('supabaseBoardIdInput');
    this.toggleKeyVisibilityBtn = document.getElementById('toggleKeyVisibilityBtn');
    this.testConnectionBtn = document.getElementById('testConnectionBtn');
    this.modalStatusDot = document.getElementById('modalStatusDot');
    this.modalStatusLabel = document.getElementById('modalStatusLabel');
    this.disconnectCloudBtn = document.getElementById('disconnectCloudBtn');
    this.pushLocalToCloudBtn = document.getElementById('pushLocalToCloudBtn');
    this.guideAccordionToggle = document.getElementById('guideAccordionToggle');
    this.guideAccordionContent = document.getElementById('guideAccordionContent');
    this.copySchemaPathBtn = document.getElementById('copySchemaPathBtn');

    // Auth & User Profile Elements
    this.topbarLoginBtn = document.getElementById('topbarLoginBtn');
    this.topbarSignupBtn = document.getElementById('topbarSignupBtn');
    this.topbarAvatarImg = document.getElementById('topbarAvatarImg');
    this.guestAvatarAnchor = document.getElementById('guest-id-card-avatar-anchor');
    this.userAccountDropdown = document.getElementById('userAccountDropdown');
    this.accountDropdownAvatar = document.getElementById('accountDropdownAvatar');
    this.accountDropdownName = document.getElementById('accountDropdownName');
    this.accountDropdownEmail = document.getElementById('accountDropdownEmail');
    this.accountMenuProfileBtn = document.getElementById('accountMenuProfileBtn');
    this.accountMenuCloudBtn = document.getElementById('accountMenuCloudBtn');
    this.accountMenuLogoutBtn = document.getElementById('accountMenuLogoutBtn');
    this.authModal = document.getElementById('authModal');
    this.authStandaloneView = document.getElementById('authStandaloneView');

    // Dashboard Shell Elements (Phase 3 1:1 Parity)
    this.dashboardView = document.getElementById('dashboardView');
    this.dashboardSidebar = document.getElementById('dashboardSidebar');
    this.sidebarProfileBtn = document.getElementById('sidebarProfileBtn');
    this.sidebarAvatarImg = document.getElementById('sidebarAvatarImg');
    this.sidebarUserName = document.getElementById('sidebarUserName');
    this.sidebarMakePadletBtn = document.getElementById('sidebarMakePadletBtn');
    this.tabRecentsBtn = document.getElementById('tabRecentsBtn');
    this.tabBookmarksBtn = document.getElementById('tabBookmarksBtn');
    this.tabSharedBtn = document.getElementById('tabSharedBtn');
    this.tabTrashBtn = document.getElementById('tabTrashBtn');
    this.sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
    this.sidebarNewFolderBtn = document.getElementById('sidebarNewFolderBtn');
    this.dashboardSearchBar = document.getElementById('dashboardSearchBar');
    this.dashboardSearchInput = document.getElementById('dashboardSearchInput');
    this.dashboardJoinBtn = document.getElementById('dashboardJoinBtn');
    this.dashboardGalleryBtn = document.getElementById('dashboardGalleryBtn');
    this.dashboardBellBtn = document.getElementById('dashboardBellBtn');
    this.dashboardAvatarBtn = document.getElementById('dashboardAvatarBtn');
    this.dashboardAvatarImg = document.getElementById('dashboardAvatarImg');
    this.dashboardTabTitle = document.getElementById('dashboardTabTitle');
    this.dashboardSortSelect = document.getElementById('dashboardSortSelect');
    this.dashboardBoardsGrid = document.getElementById('dashboardBoardsGrid');
    this.dashboardEmptyState = document.getElementById('dashboardEmptyState');
    this.dashboardEmptyTitle = document.getElementById('dashboardEmptyTitle');
    this.dashboardEmptyDesc = document.getElementById('dashboardEmptyDesc');
    this.dashboardEmptyMakeBtn = document.getElementById('dashboardEmptyMakeBtn');
    this.topbarLogoLink = document.querySelector('.padles-logo-link');
    this.boardTitle = document.getElementById('boardTitle');
    this.boardContainer = document.getElementById('boardContainer');
    this.surfaceHeaderBlock = document.querySelector('.surface-header-block');
    this.floatingPostContainer = document.getElementById('new-post-button-container');

    this.dashboardTab = 'recents';
    this.dashboardSearchQuery = '';
    this.dashboardSort = 'last_viewed';
    this.currentBoardId = 'board-default-physics';

    // Make a Padlet Creation Modal (Phase 5)
    this.makePadletModal = document.getElementById('makePadletModal');
    this.closeMakePadletModalBtn = document.getElementById('closeMakePadletModalBtn');
    this.cancelMakePadletBtn = document.getElementById('cancelMakePadletBtn');
    this.submitMakePadletBtn = document.getElementById('submitMakePadletBtn');
    this.makePadletTitleInput = document.getElementById('makePadletTitleInput');
    this.formatChoiceCards = document.querySelectorAll('.format-choice-card');
    this.wallpaperSwatchBtns = document.querySelectorAll('.wallpaper-swatch-btn');
    this.selectedCreationFormat = 'shelf';
    this.selectedCreationWallpaper = 'aurora';

    // Section Context Menu (Blueprint Section 2.2)
    this.sectionContextMenu = document.getElementById('sectionContextMenu');
    this.activeSectionContextId = null;

    // Schedule Post Modal (Blueprint Section 5.2)
    this.schedulePostModal = document.getElementById('schedulePostModal');
    this.closeScheduleBtn = document.getElementById('closeScheduleBtn');
    this.cancelScheduleBtn = document.getElementById('cancelScheduleBtn');
    this.confirmScheduleBtn = document.getElementById('confirmScheduleBtn');
    this.scheduleDateTimeInput = document.getElementById('scheduleDateTimeInput');
    this.scheduleTimezoneText = document.getElementById('scheduleTimezoneText');

    // All Tools Modal (Padlet-Authentic 4 Color Groups & Search/URL Bar)
    this.allToolsModal = document.getElementById('allToolsModal');
    this.allToolsSearchInput = document.getElementById('allToolsSearchInput');
    this.allToolsUrlSubmitBtn = document.getElementById('allToolsUrlSubmitBtn');
    this.allToolsPasteBtn = document.getElementById('allToolsPasteBtn');
    this.closeAllToolsBtn = document.getElementById('closeAllToolsBtn');
    this.allToolsGroupsContainer = document.getElementById('allToolsGroupsContainer');
    this.allToolsGrid = this.allToolsGroupsContainer;

    // Custom Field Builder (Blueprint Section 6.2)
    this.customFieldBuilderModal = document.getElementById('customFieldBuilderModal');
    this.backCustomFieldBtn = document.getElementById('backCustomFieldBtn');
    this.closeCustomFieldModalBtn = document.getElementById('closeCustomFieldModalBtn');
    this.customFieldNameInput = document.getElementById('customFieldNameInput');
    this.customFieldTypeSelect = document.getElementById('customFieldTypeSelect');
    this.customFieldTypeOptions = document.getElementById('customFieldTypeOptions');
    this.customFieldRequiredToggle = document.getElementById('customFieldRequiredToggle');
    this.cancelCustomFieldBtn = document.getElementById('cancelCustomFieldBtn');
    this.saveCustomFieldBtn = document.getElementById('saveCustomFieldBtn');
    this.customFieldsList = document.getElementById('customFieldsList');
    this.composerCustomFieldsArea = document.getElementById('composerCustomFieldsArea');

    // Draft Discard Undo Toast (Blueprint Section 7.1)
    this.draftUndoToast = document.getElementById('draftUndoToast');
    this.draftUndoBtn = document.getElementById('draftUndoBtn');
    this.lastDiscardedDraft = null;
    this.draftUndoTimeout = null;

    // Card Context Menu (Padles Authentic 14-Item Menu & 6 Swatches)
    this.cardContextMenu = document.getElementById('cardContextMenu');
    this.cardMenuColorRow = document.getElementById('cardMenuColorRow');
    this.pinActionLabel = document.getElementById('pinActionLabel');
    this.activeContextCard = null;

    // Post Detail / Expanded Theater View Modal
    this.cardDetailModal = document.getElementById('cardDetailModal');
    this.closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
    this.detailMediaCanvas = document.getElementById('detailMediaCanvas');
    this.detailSectionTitle = document.getElementById('detailSectionTitle');
    this.detailPostSubject = document.getElementById('detailPostSubject');
    this.detailPostBody = document.getElementById('detailPostBody');
    this.detailCustomFieldsBox = document.getElementById('detailCustomFieldsBox');
    this.detailReactionBtn = document.getElementById('detailReactionBtn');
    this.detailReactionCount = document.getElementById('detailReactionCount');
    this.detailCommentsList = document.getElementById('detailCommentsList');
    this.detailCommentForm = document.getElementById('detailCommentForm');
    this.detailCommentInput = document.getElementById('detailCommentInput');
    this.detailCurrentNum = document.getElementById('detailCurrentNum');
    this.detailTotalNum = document.getElementById('detailTotalNum');
    this.detailNextBtn = document.getElementById('detailNextBtn');
    this.detailPrevBtn = document.getElementById('detailPrevBtn');
    this.activeDetailCardId = null;

    // AV Studio Modal Elements (Unified Camera, Video, Audio, Screen Studio)
    this.avRecorderModal = document.getElementById('avRecorderModal');
    this.avRecorderCloseBtn = document.getElementById('avRecorderCloseBtn');
    this.avModePill = document.getElementById('avModePill');
    this.avVideoPreview = document.getElementById('avVideoPreview');
    this.avAudioWaveform = document.getElementById('avAudioWaveform');
    this.avScreenPreflight = document.getElementById('avScreenPreflight');
    this.avScreenMicCheckbox = document.getElementById('avScreenMicCheckbox');
    this.avStartScreenSelectBtn = document.getElementById('avStartScreenSelectBtn');
    this.avPermissionError = document.getElementById('avPermissionError');
    this.avPermissionErrorTitle = document.getElementById('avPermissionErrorTitle');
    this.avPermissionErrorDesc = document.getElementById('avPermissionErrorDesc');
    this.avPermissionRetryBtn = document.getElementById('avPermissionRetryBtn');
    this.avCountdownOverlay = document.getElementById('avCountdownOverlay');
    this.avCountdownNumber = document.getElementById('avCountdownNumber');
    this.avRecordingBadge = document.getElementById('avRecordingBadge');
    this.avRecordingTimerText = document.getElementById('avRecordingTimerText');
    this.avCaptureView = document.getElementById('avCaptureView');
    this.avReviewView = document.getElementById('avReviewView');
    this.avReviewMediaWrap = document.getElementById('avReviewMediaWrap');
    this.avPhotoControls = document.getElementById('avPhotoControls');
    this.avVideoControls = document.getElementById('avVideoControls');
    this.avAudioControls = document.getElementById('avAudioControls');
    this.avScreenControls = document.getElementById('avScreenControls');
    this.avReviewControls = document.getElementById('avReviewControls');
    this.avShutterBtn = document.getElementById('avShutterBtn');
    this.avMirrorToggleBtn = document.getElementById('avMirrorToggleBtn');
    this.avRecordVideoBtn = document.getElementById('avRecordVideoBtn');
    this.avRecordAudioBtn = document.getElementById('avRecordAudioBtn');
    this.avStopScreenBtn = document.getElementById('avStopScreenBtn');
    this.avRetakeBtn = document.getElementById('avRetakeBtn');
    this.avSaveMediaBtn = document.getElementById('avSaveMediaBtn');

    // AV Studio State
    this.avCurrentMode = 'photo';
    this.avActiveStream = null;
    this.avMediaRecorder = null;
    this.avRecordedChunks = [];
    this.avCapturedBlob = null;
    this.avCapturedType = null;
    this.avCapturedPreviewUrl = null;
    this.avAudioContext = null;
    this.avAudioAnalyser = null;
    this.avWaveformAnimFrame = null;
    this.avRecordingInterval = null;
    this.avRecordingSeconds = 0;
    this.avPhotoTimerSeconds = 0;
    this.avCountdownInterval = null;
    this.avIsMirrored = true;

    // Drawing Whiteboard Modal Elements
    this.drawModal = document.getElementById('drawModal');
    this.drawModalCloseBtn = document.getElementById('drawModalCloseBtn');
    this.drawSaveBtn = document.getElementById('drawSaveBtn');
    this.drawStageContainer = document.getElementById('drawStageContainer');
    this.drawCanvas = document.getElementById('drawCanvas');
    this.drawToolbar = document.getElementById('drawToolbar');
    this.drawUndoBtn = document.getElementById('drawUndoBtn');
    this.drawRedoBtn = document.getElementById('drawRedoBtn');
    this.drawBgToggleBtn = document.getElementById('drawBgToggleBtn');
    this.drawClearBtn = document.getElementById('drawClearBtn');
    this.drawColorPalette = document.getElementById('drawColorPalette');

    this.drawCurrentTool = 'pen';
    this.drawStrokeSize = 3;
    this.drawStrokeColor = '#000000';
    this.drawIsDarkBg = false;
    this.drawUndoStack = [];
    this.drawRedoStack = [];
    this.isDrawing = false;
    this.drawLastX = 0;
    this.drawLastY = 0;

    // Interactive Poll Modal Elements
    this.pollModal = document.getElementById('pollModal');
    this.pollModalCloseBtn = document.getElementById('pollModalCloseBtn');
    this.pollSaveBtn = document.getElementById('pollSaveBtn');
    this.pollQuestionInput = document.getElementById('pollQuestionInput');
    this.pollOptionsList = document.getElementById('pollOptionsList');
    this.pollAddOptionBtn = document.getElementById('pollAddOptionBtn');
    this.pollMultipleChoiceToggle = document.getElementById('pollMultipleChoiceToggle');

    // Location Map Picker Modal Elements
    this.locationModal = document.getElementById('locationModal');
    this.locationModalCloseBtn = document.getElementById('locationModalCloseBtn');
    this.locationSaveBtn = document.getElementById('locationSaveBtn');
    this.locationSearchInput = document.getElementById('locationSearchInput');
    this.locationResultsDropdown = document.getElementById('locationResultsDropdown');
    this.locationMapFrame = document.getElementById('locationMapFrame');
    this.locationPinLabel = document.getElementById('locationPinLabel');
    this.selectedLocation = null;
    this.locationSearchTimeout = null;

    // Active Composer / Draft State & Edit Mode State
    this.activeDraftId = null;
    this.editingCardId = null;
    this.composerState = {
      selectedSectionId: null,
      selectedColor: 'white',
      attachment: null
    };

    this.draggedCard = null;
    this.dragSourceSectionId = null;

    this.state = this.loadState();
    this.init();
  }

  init() {
    this.renderBoard();
    this.renderDraftsDock();
    this.initPaletteSwatches();
    this.initSectionContextMenu();
    this.initCardContextMenu();
    this.initEmojiPicker();
    this.initCardDetailModal();
    this.initScheduleModal();
    this.initAllToolsModal();
    this.initAvRecorderModal();
    this.initDrawModal();
    this.initPollModal();
    this.initLocationModal();
    this.initCustomFieldBuilder();
    this.initCloudBackendUI();
    this.initAuthSystem();
    this.initDashboard();
    this.initSlideshow();
    this.initShareDrawer();
    this.initSettingsDrawer();
    this.applyLoadedSettings();
    this.initMoreDrawer();
    this.attachEventListeners();
    this.resolveStoredAttachments();

    if (this.backend && this.backend.isConnected) {
      this.syncFromCloud();
    }
  }

  async resolveStoredAttachments() {
    if (!window.padlesMediaDB) return;

    // Resolve offline attachments on cards
    (this.state.sections || []).forEach(sec => {
      (sec.cards || []).forEach(async card => {
        if (card.attachment && card.attachment.storageId && (!card.attachment.url || card.attachment.url.startsWith('blob:'))) {
          const freshUrl = await window.padlesMediaDB.resolveUrl(card.attachment.storageId);
          if (freshUrl) {
            card.attachment.url = freshUrl;
            if (card.attachment.thumbnailUrl && card.attachment.thumbnailUrl.startsWith('blob:')) {
              card.attachment.thumbnailUrl = freshUrl;
            }
            this.renderBoard();
          }
        }
      });
    });

    // Resolve on drafts
    (this.state.drafts || []).forEach(async draft => {
      if (draft.attachment && draft.attachment.storageId && (!draft.attachment.url || draft.attachment.url.startsWith('blob:'))) {
        const freshUrl = await window.padlesMediaDB.resolveUrl(draft.attachment.storageId);
        if (freshUrl) {
          draft.attachment.url = freshUrl;
          if (draft.id === this.activeDraftId) {
            this.composerState.attachment = draft.attachment;
            this.updateAttachmentPreviewUI();
          }
        }
      }
    });
  }

  loadState() {
    let state = null;
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        state = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load board state:', e);
    }

    if (!state) {
      state = {
        author: 'Salman Madani',
        title: 'Physics Audio Reflections: I see, I think, I wonder',
        sections: [
        {
                "id": "section-395446119",
                "title": "Instructions",
                "cards": [
                        {
                                "id": "surface-post-subject-c4085710932",
                                "pinned": false,
                                "subject": "Student Instructions",
                                "title": "Student Instructions",
                                "body": "<p>Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?</p></li><li><p>Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?</p></li></ul></li></ul></li></ul></li></ul></li></ul></li></ul><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>Watch the video or look at the image.</p><p><br></p><p>Record yourself or you and your partner talking about what you See, Think, and Wonder: </p><ul><li><p><strong>I see: </strong>Describe what you see</p></li><li><p><strong>I think: </strong>Explain what you think is happening. If possible, connect to concepts that we have learned about in class.</p></li><li><p><strong>I wonder: </strong>What questions do you have about what you see?</p></li></ul>",
                                "color": "blue",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "surface-post-subject-c4093588220",
                                "pinned": false,
                                "subject": "sd",
                                "title": "sd",
                                "body": "",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446117",
                "title": "Balloon Cars",
                "cards": [
                        {
                                "id": "wish-4085710930",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.3333333333333333%2Cc_lfill%2Cdpr_1%2Ce_trim%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F50a8c8a452dce013523c4b39bbff35c11e701888%2F36fbb66b68e499a179acc8dda4bf30fc-h-6eadd3623412573bd65fb0421c008910.jpg",
                                        "caption": "balloon car making",
                                        "provider": "YouTube",
                                        "category": "YouTube"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "wish-4085710931",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.3333333333333333%2Cc_lfill%2Cdpr_1%2Ce_trim%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F523e034bb6995f36504d9755f945d1d9ae81d269%2Ff077ecdd468c21922402c4922b8de6e2-h-3f78d5625cb4750592bd47158ebbf09e.jpg",
                                        "caption": "Balloon car: Newton’s third law",
                                        "provider": "YouTube",
                                        "category": "YouTube"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "surface-post-body-c4093947677",
                                "pinned": false,
                                "subject": "",
                                "title": "",
                                "body": "<p>asd</p>",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446120",
                "title": "Newton's First Law",
                "cards": [
                        {
                                "id": "wish-4085710929",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.3333333333333333%2Cc_lfill%2Cdpr_1%2Ce_trim%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F452a86f942f6d7288eb3d37de942f70a61267e26%2Fc9ddbbc6aa2870fbbd586558643951db-h-72c024387febcc80e85323797288811e.jpg",
                                        "caption": "Newtons First Law Of Motion : Egg Drop",
                                        "provider": "YouTube",
                                        "category": "YouTube"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446118",
                "title": "BIPOC Scientists",
                "cards": [
                        {
                                "id": "wish-4085710927",
                                "pinned": true,
                                "subject": "",
                                "title": "",
                                "body": "",
                                "color": "blue",
                                "attachment": {
                                        "thumbnailUrl": "https://v1.padlet.pics/1/image.webp?t=ar_1.8703241895261846%2Cc_lfill%2Cdpr_1%2Cg_auto%2Cw_240&url=https%3A%2F%2Fpadlet-artifacts.storage.googleapis.com%2F82782ec566665fe6b49709a0beb62ca368fc9c2d%2Fa40a39f56f16f6666c7728af7c6ee2bd-h-c365868814cf236ba4dadd17a1b721e2.png",
                                        "caption": "Classroom Resources - I Am A Scientist",
                                        "provider": "iamascientist.info",
                                        "category": "iamascientist.info"
                                },
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        },
        {
                "id": "section-395446173",
                "title": "Section 5",
                "cards": [
                        {
                                "id": "surface-post-subject-c4093588317",
                                "pinned": false,
                                "subject": "sd",
                                "title": "sd",
                                "body": "",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        },
                        {
                                "id": "surface-post-body-c_new47",
                                "pinned": false,
                                "subject": "",
                                "title": "",
                                "body": "<p>This is a test post for editing. - updated</p>",
                                "color": "default",
                                "attachment": null,
                                "reactions": 0,
                                "hasReacted": false,
                                "customFieldValues": {}
                        }
                ]
        }
],
        drafts: [],
        customFields: []
      };
    }

    if (!state.drafts) {
      state.drafts = [];
    }

    if (!state.customFields) {
      state.customFields = [];
    }

    if (!state.settings) {
      state.settings = {
        title: state.title || 'Physics Audio Reflections: I see, I think, I wonder',
        description: state.description || '',
        icon: state.icon || '',
        wallpaper: state.wallpaperTheme || 'aurora',
        colorScheme: 'dark',
        font: 'niagara',
        postSize: 'standard',
        layoutFormat: 'columns',
        sortBy: 'manual',
        newPostPosition: 'last',
        showAuthorAndTime: true,
        commentsEnabled: true,
        reactionsPreset: 'all',
        moderation: 'auto',
        copyProtection: 'none',
        url: window.location.href
      };
    }

    return state;
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  /* ========================================================================
     Rendering Board Sections & Cards
     ======================================================================== */

  renderBoard() {
    this.sectionsTrack.innerHTML = '';

    this.state.sections.forEach(section => {
      const sectionCol = document.createElement('div');
      sectionCol.className = 'section-column';
      sectionCol.id = section.id;

      // Section Header (Padlet Folder Tab)
      const headerBox = document.createElement('div');
      headerBox.className = 'section-header-box';
      headerBox.innerHTML = `
        <div class="section-title-capsule">
          <div class="section-title-body">
            <h2 class="section-title-text" title="${this.escapeHtml(section.title)}">${this.escapeHtml(section.title)}</h2>
          </div>
          <div class="section-title-skew"></div>
          <button class="section-menu-btn" title="Section actions" aria-label="Section actions" data-section-id="${section.id}">
            <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M16 10a3.143 3.143 0 1 1 0-6.286A3.143 3.143 0 0 1 16 10m0 9.143a3.143 3.143 0 1 1 0-6.286 3.143 3.143 0 0 1 0 6.286m-3.143 6a3.143 3.143 0 1 0 6.286 0 3.143 3.143 0 0 0-6.286 0"/></svg>
          </button>
        </div>
        <button class="section-add-btn" title="Add post to ${this.escapeHtml(section.title)}" aria-label="Add post to ${this.escapeHtml(section.title)}">
          <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M15.984 3.319A1 1 0 0 0 15 4.333V15H4.333a1 1 0 0 0-.936.614A1 1 0 0 0 4.333 17H15v10.667a1 1 0 0 0 .614.937q.185.077.386.077a.8.8 0 0 0 .386-.077 1 1 0 0 0 .542-.55c.049-.123.074-.255.072-.387V17h10.667a1 1 0 0 0 .716-.288 1.004 1.004 0 0 0 0-1.424 1 1 0 0 0-.716-.288H17V4.333a1 1 0 0 0-.293-.722 1 1 0 0 0-.722-.292z"/></svg>
        </button>
      `;

      const menuBtn = headerBox.querySelector('.section-menu-btn');
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openSectionContextMenu(section.id, menuBtn);
      });

      const addBtn = headerBox.querySelector('.section-add-btn');
      addBtn.addEventListener('click', () => {
        this.openComposer(section.id);
      });

      // Cards Stack Container
      const cardsStack = document.createElement('div');
      cardsStack.className = 'section-cards-stack';
      cardsStack.dataset.sectionId = section.id;

      this.setupDropZone(cardsStack, section.id);

      // Render cards in this section
      (section.cards || []).forEach(card => {
        const cardEl = this.renderCardElement(card, section.id);
        cardsStack.appendChild(cardEl);
      });

      sectionCol.appendChild(headerBox);
      sectionCol.appendChild(cardsStack);
      this.sectionsTrack.appendChild(sectionCol);
    });
  }

  renderCardElement(card, sectionId) {
    const el = document.createElement('article');
    const colorClass = card.color === 'blue' ? 'color-blue' : (card.color === 'white' || card.color === 'default' ? 'color-default' : `color-${card.color || 'default'}`);
    el.className = `padlet-card ${colorClass}`;
    el.id = card.id;
    el.dataset.color = card.color || 'default';
    el.draggable = true;
    el.addEventListener('mouseenter', () => el.classList.add('is-hovered'));
    el.addEventListener('mouseleave', () => el.classList.remove('is-hovered'));

    // Apply custom palette if not default/blue
    if (card.color && card.color !== 'blue' && card.color !== 'white' && card.color !== 'default') {
      const pal = this.getPalette(card.color);
      if (pal) {
        el.style.backgroundColor = pal.cardBg;
      }
    }

    let pinnedHtml = '';
    if (card.pinned) {
      pinnedHtml = `
        <div class="card-pinned-banner" tabindex="0" aria-label="Pinned">
          <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M28.091 10.344 21.657 3.91c-1.77-1.77-4.753-1.286-5.872.953l-3.247 6.495a1 1 0 0 1-.568.498l-5.555 1.919a1.666 1.666 0 0 0-.634 2.754l4.139 4.139-5.919 5.919v1.414h1.414l5.919-5.919 4.139 4.139c.871.87 2.352.529 2.754-.634l1.919-5.555a1 1 0 0 1 .498-.568l6.495-3.247c2.239-1.119 2.723-4.103.953-5.872z"/></svg>
          </span>
          <span>Pinned</span>
        </div>
      `;
    }

    const cornerActionsHtml = `
      <div class="card-corner-actions" data-testid="surfacePostCornerActions">
        <div class="card-edit-btn-wrapper">
          <button type="button" class="card-edit-btn" title="Edit" aria-label="Edit this post" data-testid="surfacePostEditButton">
            <span>Edit</span>
          </button>
        </div>
        <div class="card-actions-divider"></div>
        <button type="button" class="card-dots-btn" title="More post actions" aria-label="More post actions" data-testid="surfacePostMoreActionsButton">
          <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M16 10a3.143 3.143 0 1 1 0-6.286A3.143 3.143 0 0 1 16 10m0 9.143a3.143 3.143 0 1 1 0-6.286 3.143 3.143 0 0 1 0 6.286m-3.143 6a3.143 3.143 0 1 0 6.286 0 3.143 3.143 0 0 0-6.286 0"/></svg>
        </button>
      </div>
    `;

    let attachmentHtml = '';
    const att = card.attachment;
    if (att) {
      if (att.type === 'poll') {
        const votedOptions = JSON.parse(localStorage.getItem(`padles_voted_${card.id}`) || '[]');
        const totalVotes = att.totalVotes || 0;
        let optionsHtml = '';
        (att.options || []).forEach(opt => {
          const isVoted = votedOptions.includes(opt.id);
          const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          optionsHtml += `
            <button type="button" class="card-poll-option-btn ${isVoted ? 'has-voted' : ''}" data-poll-card="${card.id}" data-opt-id="${opt.id}">
              <div class="card-poll-bar-fill" style="width: ${pct}%"></div>
              <span class="card-poll-option-text">${this.escapeHtml(opt.text)}</span>
              <span class="card-poll-option-pct">${pct}% (${opt.votes || 0})</span>
            </button>
          `;
        });
        attachmentHtml = `
          <div class="card-poll-container">
            <h4 class="card-poll-question">${this.escapeHtml(att.question || 'Poll')}</h4>
            <div class="card-poll-options">${optionsHtml}</div>
            <div class="card-poll-footer">${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'}${att.allowMultiple ? ' • Multiple choices allowed' : ''}</div>
          </div>
        `;
      } else if (att.type === 'audio') {
        attachmentHtml = `
          <div class="card-audio-container">
            <audio src="${this.escapeHtml(att.url)}" controls preload="metadata"></audio>
          </div>
        `;
      } else if (att.type === 'location') {
        const embedUrl = att.embedUrl || (att.latitude && att.longitude ? `https://www.openstreetmap.org/export/embed.html?bbox=${att.longitude - 0.01}%2C${att.latitude - 0.01}%2C${att.longitude + 0.01}%2C${att.latitude + 0.01}&layer=mapnik&marker=${att.latitude}%2C${att.longitude}` : '');
        attachmentHtml = `
          <div class="card-location-container">
            ${embedUrl ? `<div class="card-location-map-wrap"><iframe src="${this.escapeHtml(embedUrl)}" loading="lazy"></iframe></div>` : ''}
            <div class="card-location-info">
              <span class="card-location-title">${this.escapeHtml(att.title || 'Location')}</span>
              ${att.mapUrl ? `<a href="${this.escapeHtml(att.mapUrl)}" target="_blank" rel="noopener noreferrer" class="card-location-link">Open Map ↗</a>` : ''}
            </div>
          </div>
        `;
      } else if (att.thumbnailUrl || att.url) {
        const thumb = att.thumbnailUrl || att.url;
        if (att.category === 'iamascientist.info' || card.type === 'link') {
          attachmentHtml = `
            <div class="media-attachment-link">
              <img src="${this.escapeHtml(thumb)}" class="link-thumb" alt="${this.escapeHtml(att.caption || '')}" />
              <div class="youtube-badge">${this.escapeHtml(att.category || 'link')}</div>
            </div>
          `;
        } else if (att.type === 'video' || att.provider === 'YouTube' || att.category === 'Video Recording' || att.category === 'Screen Recording') {
          attachmentHtml = `
            <div class="media-attachment-video">
              <img src="${this.escapeHtml(thumb)}" class="video-thumb" alt="${this.escapeHtml(att.caption || '')}" />
              <div class="play-overlay-btn" title="Play">
                <svg viewBox="0 0 32 32" height="16" width="16" fill="currentColor"><path d="M7 23.54V8.46c0-2.017 2.152-3.304 3.929-2.349l14.033 7.54c1.873 1.006 1.873 3.692 0 4.698l-14.033 7.54C9.152 26.844 7 25.557 7 23.54"/></svg>
              </div>
              <div class="youtube-badge">${this.escapeHtml(att.provider || att.category || 'Video')}</div>
            </div>
          `;
        } else {
          attachmentHtml = `
            <div class="media-attachment-image">
              <img src="${this.escapeHtml(thumb)}" class="link-thumb" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: 8px;" alt="${this.escapeHtml(att.caption || '')}" />
            </div>
          `;
        }
      }
    }

    let captionHtml = card.attachment && card.attachment.caption ? `<p class="card-caption">${this.escapeHtml(card.attachment.caption)}</p>` : '';

    let subjectText = card.subject || card.title || '';
    let subjectHtml = subjectText ? `<h3 class="card-title">${this.escapeHtml(subjectText)}</h3>` : '';

    let bodyHtml = '';
    if (card.body) {
      bodyHtml = `<div class="card-text-content">${card.body}</div>`;
    } else if (card.content) {
      bodyHtml = `
        <div class="card-text-content">
          ${card.content.intro ? `<p>${card.content.intro}</p>` : ''}
          ${card.content.body ? `<p>${card.content.body}</p>` : ''}
          ${card.content.bullets ? `
            <ul>
              ${card.content.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }

    let customFieldsHtml = '';
    if (card.customFieldValues && Object.keys(card.customFieldValues).length > 0) {
      customFieldsHtml = '<div class="card-custom-fields-box">';
      for (const [cfId, val] of Object.entries(card.customFieldValues)) {
        if (val !== undefined && val !== null && val !== '') {
          const fieldDef = (this.state.customFields || []).find(f => f.id === cfId);
          const fieldName = fieldDef ? fieldDef.name : 'Field';
          let displayVal = val;
          if (fieldDef && fieldDef.type === 'rating') {
            const num = Math.min(10, Math.max(1, parseInt(val, 10) || 0));
            displayVal = '★'.repeat(num);
          }
          customFieldsHtml += `<span class="card-cf-chip"><strong>${this.escapeHtml(fieldName)}:</strong> ${this.escapeHtml(String(displayVal))}</span>`;
        }
      }
      customFieldsHtml += '</div>';
    }

    // Render post emoji reactions pills + Add reaction button
    const emojiReactions = card.emojiReactions || {};
    let reactionPillsHtml = '';
    const emojiEntries = Object.entries(emojiReactions);

    emojiEntries.forEach(([emoji, info]) => {
      if (info && info.count > 0) {
        const hex = emoji.codePointAt(0).toString(16);
        reactionPillsHtml += `
          <button type="button" class="reaction-pill ${info.userReacted ? 'is-reacted' : ''}" data-emoji="${this.escapeHtml(emoji)}" data-testid="surfacePostReactionEmojiAccumulatedReactionsButton-${hex}" aria-label="Reaction ${emoji} count ${info.count}">
            <span class="reaction-pill-emoji">${emoji}</span>
            <span class="reaction-pill-count">${info.count}</span>
          </button>
        `;
      }
    });

    // If card.reactions > 0 but emojiReactions is empty (legacy data)
    if (emojiEntries.length === 0 && card.reactions > 0) {
      reactionPillsHtml += `
        <button type="button" class="reaction-pill ${card.hasReacted ? 'is-reacted' : ''}" data-emoji="❤️" data-testid="surfacePostReactionEmojiAccumulatedReactionsButton-2764" aria-label="Reaction ❤️ count ${card.reactions}">
          <span class="reaction-pill-emoji">❤️</span>
          <span class="reaction-pill-count">${card.reactions}</span>
        </button>
      `;
    }

    const addReactionSvg = `
      <svg viewBox="0 0 24 24" height="18" width="18" fill="currentColor">
        <path d="M11.168 3c0.657 0 1.299 0.064 1.92 0.188-0.171 0.455-0.287 0.937-0.342 1.437-0.511-0.098-1.038-0.151-1.578-0.151-4.616 0-8.359 3.743-8.359 8.359s3.743 8.358 8.359 8.358c4.616 0 8.358-3.742 8.358-8.358 0-0.54-0.053-1.068-0.151-1.579 0.5-0.055 0.982-0.172 1.437-0.342 0.123 0.622 0.189 1.264 0.189 1.922-0 5.431-4.403 9.833-9.833 9.833s-9.833-4.402-9.833-9.833c0-5.431 4.402-9.833 9.833-9.833z"/>
        <path d="M6.654 15.447c0.32-0.252 0.783-0.196 1.035 0.124 0.835 1.059 2.105 1.689 3.479 1.689 1.373-0 2.64-0.628 3.475-1.685 0.252-0.32 0.717-0.375 1.037-0.122s0.373 0.717 0.121 1.036c-1.112 1.407-2.804 2.246-4.633 2.246-1.831 0-3.525-0.841-4.637-2.251-0.252-0.32-0.197-0.784 0.122-1.036z"/>
        <path d="M8.219 9.638c0.678 0 1.228 0.551 1.228 1.229s-0.55 1.228-1.228 1.228-1.228-0.55-1.228-1.228c0-0.678 0.549-1.229 1.228-1.229z"/>
        <path d="M14.119 9.638c0.26 0 0.501 0.081 0.699 0.219 0.050 0.043 0.101 0.085 0.152 0.126 0.232 0.223 0.376 0.537 0.376 0.884-0 0.678-0.55 1.228-1.228 1.228s-1.229-0.55-1.229-1.228c0-0.678 0.551-1.229 1.229-1.229z"/>
        <path d="M19.163 7.111c0.61 0.85 1.089 1.8 1.404 2.823-0.452 0.181-0.936 0.298-1.441 0.34-0.155-0.481-0.351-0.944-0.586-1.383 0.026 0.010 0.051 0.023 0.078 0.029l0.092 0.009c0.251-0 0.453-0.204 0.453-0.454v-1.363z"/>
        <path d="M17.981 5.746c0.093 0.090 0.185 0.18 0.275 0.273v2.383c-0.673-1.074-1.583-1.983-2.658-2.656h2.383z"/>
        <path d="M14.067 3.434c1.023 0.315 1.972 0.795 2.823 1.405h-1.362l-0.091 0.008c-0.207 0.042-0.363 0.226-0.363 0.445 0 0.059 0.011 0.115 0.031 0.167-0.437-0.234-0.898-0.429-1.378-0.583 0.042-0.506 0.159-0.99 0.34-1.441z"/>
        <path d="M18.667 0.333c-2.761 0-5 2.239-5 5s2.239 5 5 5c2.761 0 5-2.239 5-5s-2.239-5-5-5zM18.667 1.697c0.251 0 0.455 0.204 0.455 0.455v2.727h2.727c0.251 0 0.454 0.204 0.454 0.455s-0.204 0.455-0.454 0.455h-2.727v2.727c0 0.251-0.204 0.455-0.455 0.455s-0.455-0.204-0.455-0.455v-2.727h-2.727c-0.251 0-0.455-0.204-0.455-0.455s0.204-0.455 0.455-0.455h2.727v-2.727c0-0.251 0.204-0.455 0.455-0.455z"/>
      </svg>
    `;

    const bottomBarHtml = `
      <div class="card-bottom-bar">
        <div class="card-reactions-group" data-testid="surfacePostReactionEmoji">
          ${reactionPillsHtml}
          <button type="button" class="reaction-btn reaction-add-btn" title="Add reaction" aria-label="Add reaction" data-testid="surfacePostReactionEmojiAddReactionButton">
            ${addReactionSvg}
          </button>
        </div>
      </div>
    `;

    el.innerHTML = `
      ${pinnedHtml}
      <div class="card-inner-surface">
        ${cornerActionsHtml}
        ${attachmentHtml}
        ${captionHtml}
        ${subjectHtml}
        ${bodyHtml}
        ${customFieldsHtml}
        ${bottomBarHtml}
      </div>
    `;

    // Corner Edit and 3-dots actions
    const editBtn = el.querySelector('.card-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editPost(card.id);
      });
    }

    const dotsBtn = el.querySelector('.card-dots-btn');
    if (dotsBtn) {
      dotsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openCardContextMenu(card, dotsBtn);
      });
    }

    // Reaction pill clicks (toggles specific emoji reaction)
    el.querySelectorAll('.reaction-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = pill.dataset.emoji;
        if (emoji) this.toggleCardEmojiReaction(card.id, emoji);
      });
    });

    // Add reaction button click (opens 336px x 377px authentic Padlet emoji picker)
    const addReactBtn = el.querySelector('.reaction-add-btn');
    if (addReactBtn) {
      addReactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openEmojiPicker(addReactBtn, card.id);
      });
    }

    // Poll option voting clicks
    el.querySelectorAll('.card-poll-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardId = btn.dataset.pollCard;
        const optId = btn.dataset.optId;
        if (cardId && optId) {
          this.voteOnPoll(cardId, optId);
        }
      });
    });

    // In Padles, left clicking a card does nothing (detail view opened via context menu / actions)
    // Right clicking a card opens post actions context menu at cursor position
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.openCardContextMenu(card, el, e);
    });

    // Drag start
    el.addEventListener('dragstart', (e) => {
      this.draggedCard = card;
      this.dragSourceSectionId = sectionId;
      el.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.id);
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('is-dragging');
      this.draggedCard = null;
      this.dragSourceSectionId = null;
    });

    return el;
  }

  setupDropZone(stackEl, targetSectionId) {
    stackEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });

    stackEl.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!this.draggedCard) return;

      const sourceSection = this.state.sections.find(s => s.id === this.dragSourceSectionId);
      const targetSection = this.state.sections.find(s => s.id === targetSectionId);

      if (!sourceSection || !targetSection) return;

      const movedCard = this.draggedCard;
      sourceSection.cards = sourceSection.cards.filter(c => c.id !== movedCard.id);
      targetSection.cards.push(movedCard);

      this.saveState();
      this.renderBoard();
      this.showToast(`Moved to ${targetSection.title}`);

      if (this.backend && this.backend.isConnected) {
        this.backend.reorderPost(movedCard.id, targetSectionId, 1000.0);
      }
    });
  }

  /* ========================================================================
     Padles-Authentic Multiple Drafts & Composer Management
     ======================================================================== */

  openComposer(targetSectionId = null) {
    this.createNewDraft(targetSectionId);
  }

  createNewDraft(targetSectionId = null) {
    // If we were editing a card, cancel edit mode
    if (this.editingCardId) {
      this.cancelEditPost();
    }

    // If there's an active draft open, sync its state first
    if (this.activeDraftId) {
      this.syncActiveDraftFromInputs();
    }

    const secId = targetSectionId || this.state.sections[0]?.id;
    const maxNum = this.state.drafts.reduce((max, d) => Math.max(max, d.draftNumber || 0), 0);
    const newDraft = {
      id: 'draft-' + Date.now(),
      draftNumber: maxNum + 1,
      title: '',
      body: '',
      color: 'white',
      sectionId: secId,
      attachment: null
    };

    // Appended to the end of drafts array (chronological order)
    this.state.drafts.push(newDraft);
    this.activeDraftId = newDraft.id;
    this.editingCardId = null;
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.saveState();
    this.openDraftInComposer(newDraft);
  }

  openDraftInComposer(draft) {
    this.activeDraftId = draft.id;
    this.editingCardId = null;
    this.titleInput.value = draft.title || '';
    this.bodyInput.value = draft.body || '';
    this.composerState.selectedColor = draft.color || 'white';
    this.composerState.selectedSectionId = draft.sectionId || this.state.sections[0]?.id;
    this.composerState.attachment = draft.attachment || null;

    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.updateColorPickerUI();
    this.updateSectionSelectorUI();
    this.updateAttachmentPreviewUI();
    this.updatePublishButtonState();
    this.renderComposerCustomFields(draft);

    this.renderDraftsDock();
    this.titleInput.focus();
  }

  /* ========================================================================
     Edit Existing Post in Composer ("Update" Workflow)
     ======================================================================== */

  editPost(cardId) {
    const data = this.findCardAndSection(cardId);
    if (!data) return;
    const { card, section } = data;

    this.editingCardId = card.id;

    this.titleInput.value = card.title || '';
    if (card.content) {
      let bodyText = card.content.body || '';
      if (card.content.intro) bodyText = card.content.intro + '\n\n' + bodyText;
      this.bodyInput.value = bodyText.trim();
    } else if (card.attachment && card.attachment.caption) {
      this.bodyInput.value = card.attachment.caption;
    } else {
      this.bodyInput.value = '';
    }

    this.composerState.selectedColor = card.color || 'white';
    this.composerState.selectedSectionId = section.id;
    this.composerState.attachment = card.attachment || null;

    this.updateColorPickerUI();
    this.updateSectionSelectorUI();
    this.updateAttachmentPreviewUI();

    // Set button to Update mode with Padlet hot-pink #ff1f6d
    this.publishBtn.textContent = 'Update';
    this.publishBtn.title = 'Update post';
    this.publishBtn.setAttribute('aria-label', 'Update post');
    this.publishBtn.disabled = false;
    this.publishBtn.classList.add('is-active', 'is-update');

    this.renderComposerCustomFields(card);

    // Apply authentic dark edit mode styling to composerCard
    this.composerCard.className = 'composer-card is-editing-mode';

    // Mount composer card into centered edit overlay (Padlet Authentic Centered Modal)
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.appendChild(this.composerCard);
      this.editPostModalOverlay.hidden = false;
    } else if (this.composerCardWrapper) {
      this.composerCardWrapper.hidden = false;
      this.composerCardWrapper.appendChild(this.composerCard);
    }
    this.composerCard.hidden = false;

    this.adjustBodyTextareaHeight();
    this.bodyInput.focus();
    this.showToast(`Editing "${card.title || 'post'}"`);
  }

  adjustBodyTextareaHeight() {
    if (!this.bodyInput) return;
    this.bodyInput.style.height = 'auto';
    const newHeight = Math.max(38, this.bodyInput.scrollHeight);
    this.bodyInput.style.height = `${newHeight}px`;
  }

  cancelEditPost() {
    this.editingCardId = null;
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.composerCard.className = 'composer-card';
    this.composerCard.hidden = true;

    // Return composer card to bottom drafts wrapper
    if (this.composerCardWrapper) {
      this.composerCardWrapper.appendChild(this.composerCard);
      this.composerCardWrapper.hidden = true;
    }
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.hidden = true;
    }

    // Reset composer inputs
    this.titleInput.value = '';
    this.bodyInput.value = '';
    this.composerState.attachment = null;
    this.updateAttachmentPreviewUI();
  }

  async saveEditedCard() {
    const data = this.findCardAndSection(this.editingCardId);
    if (!data) return;
    const { card, section: oldSection } = data;

    const newTitle = this.titleInput.value.trim();
    const newBody = this.bodyInput.value.trim();
    const targetSectionId = this.composerState.selectedSectionId || oldSection.id;
    const newColor = this.composerState.selectedColor || 'white';

    card.title = newTitle;
    card.color = newColor;

    if (this.composerState.attachment) {
      card.type = this.composerState.attachment.type;
      card.attachment = this.composerState.attachment;
      if (newBody) card.attachment.caption = newBody;
    } else {
      card.type = 'text';
      card.attachment = null;
      card.content = {
        body: newBody
      };
    }

    if (!card.customFieldValues) card.customFieldValues = {};
    if (this.composerCustomFieldsArea) {
      this.composerCustomFieldsArea.querySelectorAll('[data-cf-id]').forEach(input => {
        card.customFieldValues[input.dataset.cfId] = input.value;
      });
    }

    // Move to new section if changed
    if (targetSectionId !== oldSection.id) {
      oldSection.cards = oldSection.cards.filter(c => c.id !== card.id);
      const targetSec = this.state.sections.find(s => s.id === targetSectionId);
      if (targetSec) {
        targetSec.cards.push(card);
      }
    }

    const savedCardId = this.editingCardId;
    this.editingCardId = null;

    // Clean up UI & return composer card to dock
    this.publishBtn.textContent = 'Publish';
    this.publishBtn.classList.remove('is-update');
    this.composerCard.className = 'composer-card';
    this.composerCard.hidden = true;
    if (this.composerCardWrapper) {
      this.composerCardWrapper.appendChild(this.composerCard);
      this.composerCardWrapper.hidden = true;
    }
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.hidden = true;
    }

    this.saveState();
    this.renderBoard();
    this.showToast('Post updated!');

    // Sync to backend / Supabase
    if (this.backend && this.backend.isConnected) {
      try {
        await this.backend.updatePost(card, targetSectionId);
      } catch (err) {
        console.warn('Backend update failed:', err);
      }
    }
  }

  syncActiveDraftFromInputs() {
    if (!this.activeDraftId) return;
    const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
    if (!draft) return;

    draft.title = this.titleInput.value.trim();
    draft.body = this.bodyInput.value.trim();
    draft.color = this.composerState.selectedColor;
    draft.sectionId = this.composerState.selectedSectionId;
    draft.attachment = this.composerState.attachment;

    if (!draft.customFieldValues) draft.customFieldValues = {};
    if (this.composerCustomFieldsArea) {
      this.composerCustomFieldsArea.querySelectorAll('[data-cf-id]').forEach(input => {
        draft.customFieldValues[input.dataset.cfId] = input.value;
      });
    }
  }

  minimizeActiveDraft() {
    if (this.editingCardId) {
      this.cancelEditPost();
      return;
    }
    if (!this.activeDraftId) return;

    this.syncActiveDraftFromInputs();
    this.activeDraftId = null;
    this.colorPaletteDropdown.hidden = true;
    this.saveState();
    this.renderDraftsDock();
    this.showToast('Draft minimized to bottom dock');
  }

  closeActiveDraft() {
    if (this.editingCardId) {
      this.cancelEditPost();
      return;
    }
    if (this.activeDraftId) {
      this.discardDraft(this.activeDraftId);
    }
  }

  closeComposer() {
    if (this.editingCardId) {
      this.cancelEditPost();
      return;
    }
    this.minimizeActiveDraft();
  }

  activateDraft(draftId) {
    if (this.editingCardId) {
      this.cancelEditPost();
    }
    if (this.activeDraftId === draftId) return;

    if (this.activeDraftId) {
      this.syncActiveDraftFromInputs();
    }

    const target = this.state.drafts.find(d => d.id === draftId);
    if (!target) return;

    this.openDraftInComposer(target);
  }

  discardDraft(draftId, e) {
    if (e) e.stopPropagation();
    const idx = this.state.drafts.findIndex(d => d.id === draftId);
    if (idx === -1) return;
    const discarded = this.state.drafts[idx];
    this.lastDiscardedDraft = { draft: { ...discarded }, index: idx };

    this.state.drafts = this.state.drafts.filter(d => d.id !== draftId);
    if (this.activeDraftId === draftId) {
      this.activeDraftId = null;
    }
    this.colorPaletteDropdown.hidden = true;
    this.saveState();
    this.renderDraftsDock();
    this.showDraftUndoToast();
  }

  showDraftUndoToast() {
    if (!this.draftUndoToast) return;
    this.draftUndoToast.hidden = false;
    clearTimeout(this.draftUndoTimeout);
    this.draftUndoTimeout = setTimeout(() => {
      if (this.draftUndoToast) this.draftUndoToast.hidden = true;
      this.lastDiscardedDraft = null;
    }, 10000);
  }

  undoDiscardDraft() {
    if (!this.lastDiscardedDraft) return;
    const { draft, index } = this.lastDiscardedDraft;
    const insertIdx = Math.min(index, this.state.drafts.length);
    this.state.drafts.splice(insertIdx, 0, draft);
    this.lastDiscardedDraft = null;
    if (this.draftUndoToast) this.draftUndoToast.hidden = true;
    clearTimeout(this.draftUndoTimeout);
    this.saveState();
    this.renderDraftsDock();
    this.showToast('Draft restored!');
  }

  toggleComposerExpanded() {
    this.composerCard.classList.toggle('is-expanded');
    const isExp = this.composerCard.classList.contains('is-expanded');
    this.expandModalBtn.title = isExp ? 'Dock post' : 'Expand post';
    this.expandModalBtn.setAttribute('aria-label', isExp ? 'Dock post' : 'Expand post');

    const svg = document.getElementById('expandModalSvg');
    if (svg) {
      if (isExp) {
        svg.innerHTML = '<path d="M26.279 28h.006c.391.002.784-.126 1.099-.385.36-.28.593-.689.595-1.141q.019-.18 0-.361l.02-14.571c0-.809-.779-1.56-1.704-1.541-.926 0-1.705.731-1.705 1.54l-.007 10.65L6.882 4.478c-.625-.625-1.756-.655-2.395.015-.655.655-.64 1.77-.015 2.395l9.12 9.105 8.593 8.604-12.195-.015c-.884 0-1.704.778-1.683 1.704 0 .926.799 1.705 1.682 1.705l16.289.01z"/>';
      } else {
        svg.innerHTML = '<path d="M5.721 4h-.006a1.72 1.72 0 0 0-1.099.385c-.36.28-.593.689-.595 1.141q-.02.18 0 .361l-.02 14.571c0 .809.779 1.56 1.704 1.541.926 0 1.705-.731 1.705-1.54l.007-10.65 17.701 17.713c.625.625 1.756.655 2.395-.015.655-.655.64-1.77.015-2.395l-9.12-9.105-8.593-8.604 12.195.015c.884 0 1.704-.778 1.683-1.704 0-.926-.799-1.705-1.682-1.705l-16.289-.01z"/>';
      }
    }

    const activeSlot = this.dockedTabsTrack?.querySelector('.dock-slot-item.is-active-slot');
    if (activeSlot) {
      activeSlot.classList.toggle('is-expanded', isExp);
    }
  }

  /**
   * Slot-based in-place draft rendering:
   * Keeps chronological order of drafts fixed.
   * When opening Draft 3 out of 5, Draft 1 and Draft 2 stay on the left,
   * Draft 3 expands in-place into the active composer, and Draft 4 and 5 stay on the right.
   * Zero tab reordering!
   */
  renderDraftsDock() {
    if (!this.dockedTabsTrack) return;
    this.dockedTabsTrack.innerHTML = '';

    const totalDrafts = this.state.drafts.length;
    if (this.dockBulkActionWrapper) {
      this.dockBulkActionWrapper.hidden = totalDrafts < 2;
    }

    if (totalDrafts === 0) {
      if (this.composerCardWrapper) {
        this.composerCardWrapper.hidden = true;
        this.composerCardWrapper.appendChild(this.composerCard);
      }
      return;
    }

    // Render every draft strictly in array order
    this.state.drafts.forEach((draft, idx) => {
      const slot = document.createElement('div');
      slot.className = 'dock-slot-item';
      slot.dataset.draftId = draft.id;
      slot.dataset.slotIndex = idx;

      if (draft.id === this.activeDraftId) {
        // ACTIVE DRAFT: Mount the composer card inside this exact slot!
        slot.classList.add('is-active-slot');
        if (this.composerCard.classList.contains('is-expanded')) {
          slot.classList.add('is-expanded');
        }

        // Mount composer card inside this slot
        slot.appendChild(this.composerCard);
        this.composerCard.hidden = false;

        // Smooth pop-in animation
        this.composerCard.classList.remove('composer-pop-in');
        void this.composerCard.offsetWidth;
        this.composerCard.classList.add('composer-pop-in');
      } else {
        // INACTIVE DRAFT: Render minimized tab button
        const tab = document.createElement('button');
        tab.className = 'dock-tab-btn';
        const labelText = draft.title ? draft.title : `Draft ${draft.draftNumber}`;
        tab.title = labelText;
        tab.setAttribute('data-testid', 'composerModalMinimizedButton');
        tab.innerHTML = `
          <span class="dock-tab-title">${this.escapeHtml(labelText)}</span>
          <span class="dock-tab-close-btn" title="Discard ${this.escapeHtml(labelText)}">&times;</span>
        `;

        tab.querySelector('.dock-tab-close-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.discardDraft(draft.id, e);
        });

        tab.addEventListener('click', () => {
          this.activateDraft(draft.id);
        });

        slot.appendChild(tab);
      }

      this.dockedTabsTrack.appendChild(slot);
    });

    // If no draft is active, keep composerCard parked inside composerCardWrapper (hidden)
    if (!this.activeDraftId && this.composerCardWrapper) {
      this.composerCardWrapper.hidden = true;
      this.composerCardWrapper.appendChild(this.composerCard);
    }
  }

  publishActiveDraft() {
    if (this.editingCardId) {
      this.saveEditedCard();
      return;
    }
    this.syncActiveDraftFromInputs();
    const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
    if (!draft) return;

    const title = draft.title;
    const body = draft.body;
    const section = this.state.sections.find(s => s.id === draft.sectionId) || this.state.sections[0];

    const newCard = {
      id: 'card-' + Date.now(),
      title: title || (draft.attachment ? draft.attachment.title : 'Note'),
      pinned: false,
      color: draft.color || 'cyan',
      reactions: 0,
      hasReacted: false
    };

    if (draft.attachment) {
      newCard.type = draft.attachment.type;
      newCard.attachment = draft.attachment;
    } else {
      newCard.type = 'text';
      newCard.content = {
        body: body || 'Reflection entry'
      };
    }

    if (draft.customFieldValues && Object.keys(draft.customFieldValues).length > 0) {
      newCard.customFieldValues = { ...draft.customFieldValues };
    }

    section.cards.push(newCard);

    // Remove draft from drafts list
    this.state.drafts = this.state.drafts.filter(d => d.id !== draft.id);
    this.activeDraftId = null;
    this.colorPaletteDropdown.hidden = true;

    this.saveState();
    this.renderBoard();
    this.renderDraftsDock();
    this.showToast(`Post published to ${section.title}!`);

    if (this.backend && this.backend.isConnected) {
      this.backend.createPost(newCard, section.id);
    }
  }

  publishAllDrafts() {
    this.syncActiveDraftFromInputs();
    if (this.state.drafts.length === 0) return;

    let publishedCount = 0;
    this.state.drafts.forEach((draft, idx) => {
      const section = this.state.sections.find(s => s.id === draft.sectionId) || this.state.sections[0];
      const newCard = {
        id: 'card-' + Date.now() + '-' + idx,
        title: draft.title || (draft.attachment ? draft.attachment.title : `Draft Note ${draft.draftNumber}`),
        pinned: false,
        color: draft.color || 'cyan',
        reactions: 0,
        hasReacted: false
      };

      if (draft.attachment) {
        newCard.type = draft.attachment.type;
        newCard.attachment = draft.attachment;
      } else {
        newCard.type = 'text';
        newCard.content = {
          body: draft.body || 'Audio reflection notes'
        };
      }

      section.cards.push(newCard);
      publishedCount++;

      if (this.backend && this.backend.isConnected) {
        this.backend.createPost(newCard, section.id);
      }
    });

    this.state.drafts = [];
    this.activeDraftId = null;
    this.postModal.hidden = true;
    this.postModal.classList.remove('is-open');
    this.draftsBulkMenu.hidden = true;

    this.saveState();
    this.renderBoard();
    this.renderDraftsDock();
    this.showToast(`Published all ${publishedCount} drafts!`);
  }

  deleteAllDrafts() {
    const count = this.state.drafts.length;
    this.state.drafts = [];
    this.activeDraftId = null;
    this.postModal.hidden = true;
    this.postModal.classList.remove('is-open');
    this.draftsBulkMenu.hidden = true;

    this.saveState();
    this.renderDraftsDock();
    this.showToast(`Deleted ${count} drafts`);
  }

  updatePublishButtonState() {
    const hasContent = this.titleInput.value.trim().length > 0 || 
                       this.bodyInput.value.trim().length > 0 || 
                       this.composerState.attachment !== null;

    this.publishBtn.disabled = !hasContent;
    this.publishBtn.classList.toggle('is-active', hasContent);
    if (this.editingCardId) {
      this.publishBtn.textContent = 'Update';
      this.publishBtn.title = 'Update post';
      this.publishBtn.setAttribute('aria-label', 'Update post');
      this.publishBtn.classList.add('is-update');
    } else {
      this.publishBtn.textContent = 'Publish';
      this.publishBtn.title = 'Submit post';
      this.publishBtn.setAttribute('aria-label', 'Submit post');
      this.publishBtn.classList.remove('is-update');
    }
  }

  getPalette(colorId) {
    if (colorId === 'cyan') colorId = 'blue';
    if (colorId === 'pink') colorId = 'red';
    return PALETTES.find(p => p.id === colorId) || PALETTES[0];
  }

  /* ========================================================================
     Color Popover (Picture 2: Pastel Colors List with Radio Indicator)
     ======================================================================== */

  renderColorPopover() {
    if (!this.colorOptionsList) return;
    this.colorOptionsList.innerHTML = '';

    PALETTES.forEach(pal => {
      const isSelected = this.composerState.selectedColor === pal.id;
      const row = document.createElement('div');
      row.className = `color-option-row ${isSelected ? 'is-selected' : ''}`;
      row.innerHTML = `
        <div class="color-option-left">
          <span class="color-swatch-circle" style="background-color: ${pal.dot};"></span>
          <span class="color-option-name">${this.escapeHtml(pal.name)}</span>
        </div>
        <div class="color-radio-ring"></div>
      `;

      row.addEventListener('click', (e) => {
        e.stopPropagation();
        this.composerState.selectedColor = pal.id;
        if (this.editingCardId) {
          this.composerCard.className = `composer-card is-editing-mode palette-${pal.id}`;
        } else {
          this.syncActiveDraftFromInputs();
        }
        this.updateColorPickerUI();
        this.closeAllPopovers();
        this.showToast(`Color set to ${pal.name}`);
      });

      this.colorOptionsList.appendChild(row);
    });
  }

  toggleColorPopover(e) {
    if (e) e.stopPropagation();
    const isHidden = !this.colorSelectPopover || this.colorSelectPopover.hidden;
    this.closeAllPopovers();
    if (isHidden && this.colorSelectPopover) {
      this.renderColorPopover();
      this.colorSelectPopover.hidden = false;
    }
  }

  initPaletteSwatches() {
    // Header palette icon syncs with color popover
  }

  updateColorPickerUI() {
    const pal = this.getPalette(this.composerState.selectedColor);
    if (this.currentColorDot) this.currentColorDot.style.backgroundColor = pal.dot;
    if (this.currentColorLabel) this.currentColorLabel.textContent = pal.name;
  }

  updateSectionSelectorUI() {
    const sec = this.state.sections.find(s => s.id === this.composerState.selectedSectionId) || this.state.sections[0];
    this.currentSectionLabel.textContent = sec ? sec.title : 'Section';
  }

  /* ========================================================================
     Section Popover (Picture 3: List of Sections with Yellow Checkmark)
     ======================================================================== */

  renderSectionPopover() {
    if (!this.sectionOptionsList) return;
    this.sectionOptionsList.innerHTML = '';

    this.state.sections.forEach(sec => {
      const isSelected = this.composerState.selectedSectionId === sec.id;
      const row = document.createElement('div');
      row.className = `section-option-row ${isSelected ? 'is-selected' : ''}`;
      row.innerHTML = `
        <span class="section-option-title">${this.escapeHtml(sec.title)}</span>
        <span class="section-check-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
      `;

      row.addEventListener('click', (e) => {
        e.stopPropagation();
        this.composerState.selectedSectionId = sec.id;
        if (!this.editingCardId) {
          this.syncActiveDraftFromInputs();
        }
        this.updateSectionSelectorUI();
        this.closeAllPopovers();
        this.showToast(`Section set to ${sec.title}`);
      });

      this.sectionOptionsList.appendChild(row);
    });
  }

  toggleSectionPopover(e) {
    if (e) e.stopPropagation();
    const isHidden = !this.sectionSelectPopover || this.sectionSelectPopover.hidden;
    this.closeAllPopovers();
    if (isHidden && this.sectionSelectPopover) {
      this.renderSectionPopover();
      this.sectionSelectPopover.hidden = false;
    }
  }

  /* ========================================================================
     Post Fields Modal (Picture 4: Post Fields Panel)
     ======================================================================== */

  openPostFieldsModal(e) {
    if (e) e.stopPropagation();
    this.closeAllPopovers();
    if (this.postFieldsModal) {
      this.renderCustomFieldsList();
      this.postFieldsModal.hidden = false;
    }
  }

  closePostFieldsModal() {
    if (this.postFieldsModal) {
      this.postFieldsModal.hidden = true;
    }
  }

  closeAllPopovers() {
    if (this.colorSelectPopover) this.colorSelectPopover.hidden = true;
    if (this.sectionSelectPopover) this.sectionSelectPopover.hidden = true;
    if (this.colorPaletteDropdown) this.colorPaletteDropdown.hidden = true;
    if (this.sectionContextMenu) this.sectionContextMenu.hidden = true;
    if (this.cardContextMenu) this.cardContextMenu.hidden = true;
    this.closeEmojiPicker();
  }

  /* ========================================================================
     Padlet-Authentic 336px x 377px Emoji Picker Popover (8 Categories & Reactions)
     ======================================================================== */

  initEmojiPicker() {
    this.emojiPickerPopover = document.getElementById('emojiPickerPopover');
    this.emojiSearchInput = document.getElementById('emojiSearchInput');
    this.emojiSearchClearBtn = document.getElementById('emojiSearchClearBtn');
    this.emojiPickerContent = document.getElementById('emojiPickerContent');
    this.emojiCategoryTabs = document.getElementById('emojiCategoryTabs');

    if (!this.emojiPickerPopover) return;

    this.emojiKeywords = {
      '😀': 'grinning face happy smile laugh',
      '😃': 'smiling face big eyes happy joy',
      '😄': 'smiling face open mouth laughing',
      '😁': 'beaming face teeth smile grin',
      '😆': 'grinning squinting laughing lol',
      '😅': 'sweat smile nervous relief',
      '😂': 'tears joy laughing haha funny lol',
      '🤣': 'rofl rolling floor laughing lol',
      '😊': 'smiling blush warm kind happy',
      '😇': 'halo angel innocent blessed',
      '🙂': 'slightly smiling smile fine okay',
      '🙃': 'upside down silly sarcasm irony',
      '😉': 'winking wink flirt playful',
      '😌': 'relieved calm peaceful relaxed',
      '😍': 'heart eyes in love adore crush',
      '🥰': 'smiling hearts loved affectionate',
      '😘': 'blow kiss kissing love romantic',
      '😗': 'kissing kiss whistle',
      '😙': 'kissing smiling eyes kiss blush',
      '😚': 'kissing closed eyes blush kiss',
      '😋': 'yum delicious tasty licking food',
      '😛': 'tongue playful cheeky silly',
      '😝': 'squinting tongue lol funny tease',
      '😜': 'winking tongue crazy wink wacky',
      '🤪': 'zany face wild crazy goofy',
      '🤨': 'raised eyebrow skeptic doubt suspicious',
      '🧐': 'monocle classy curious inspect study',
      '🤓': 'nerd geek glasses smart study',
      '😎': 'sunglasses cool stylish shades awesome',
      '🥸': 'disguise mustache glasses undercover incognito',
      '🤩': 'star struck excited amazed awesome',
      '🥳': 'partying party celebration happy birthday celebrate',
      '😏': 'smirk smirking smug flirt suggestive',
      '😒': 'unamused annoyed displeased unimpressed',
      '😞': 'disappointed sad down upset regret',
      '😔': 'pensive thoughtful sad mournful',
      '😟': 'worried concerned anxious nervous',
      '😕': 'confused puzzled hesitant unsure',
      '🙁': 'slightly frowning sad frown',
      '☹️': 'frowning sad sorrow unhappy',
      '😣': 'persevering struggle upset pain',
      '😖': 'confounded upset distressed irritated',
      '😫': 'tired weary exhausted stressed',
      '😩': 'weary crying upset tired despair',
      '🥺': 'pleading begging cute puppy eyes please',
      '😢': 'crying tear sad upset grief',
      '😭': 'loudly crying sob bawling tears upset',
      '😤': 'triumph steam angry determined pride',
      '😠': 'angry mad annoyed furious irritated',
      '😡': 'pouting rage furious mad red',
      '🤬': 'cursing swearing angry symbols mad',
      '🤯': 'exploding head mind blown shocked amazed',
      '😳': 'flushed embarrassed surprised blush wide eyes',
      '🥵': 'hot face sweat heat summer warm',
      '🥶': 'cold face freezing ice winter frost',
      '😱': 'screaming fear scream terrified scared shock',
      '😨': 'fearful scared worried anxious afraid',
      '😰': 'anxious sweat scared worried blue',
      '😥': 'sad relieved whew phew close call',
      '😓': 'downcast sweat discouraged overwhelmed',
      '🤗': 'hugging hug warm embrace welcome open',
      '🤔': 'thinking ponder wonder consider hmm question',
      '🫣': 'peeking eye scared curious hiding peek',
      '🤭': 'hand mouth giggle oops chuckle shy',
      '🫢': 'open eyes hand mouth gasp shocked surprised',
      '🫡': 'saluting salute respect yes sir honor',
      '🤫': 'shushing quiet secret whisper silence shh',
      '🫠': 'melting melt hot sarcasm dissolving',
      '🤥': 'lying liar pinocchio nose deception',
      '😶': 'no mouth silent blank speechless mute',
      '🫥': 'dotted face invisible disappearing unseen fade',
      '😐': 'neutral poker straight face deadpan fine',
      '🫤': 'diagonal mouth skeptical unsure confused meh',
      '😑': 'expressionless blank emotionless flat done',
      '🫨': 'shaking vibrating shock earthquake tremble',
      '😬': 'grimacing awkward yikes tense nervous',
      '🙄': 'rolling eyes annoyed Whatever bored sarcasm',
      '😯': 'hushed surprised gasp astonishment',
      '😦': 'frowning open mouth stunned surprise',
      '😧': 'anguished shocked alarmed hurt',
      '😮': 'open mouth wow oh surprise gasp',
      '😲': 'astonished shocked amazed stunned',
      '🥱': 'yawning yawn tired sleepy boring bedtime',
      '😴': 'sleeping sleep zzz tired goodnight bedtime',
      '🤤': 'drooling drool hungry delicious desire craving',
      '😪': 'sleepy tired snot bubble resting dozing',
      '😵': 'dizzy knocked out stunned dead unconscious',
      '😵‍💫': 'spiral eyes dizzy disoriented hypnotized confused',
      '🤐': 'zipper mouth secret quiet silent locked',
      '🥴': 'woozy drunk tipsy dizzy confused dazed',
      '🤢': 'nauseated sick gross disgust ill green',
      '🤮': 'vomiting vomit puke throw up barf sick',
      '🤧': 'sneezing sneeze tissue cold sick allergy',
      '😷': 'medical mask sick covid illness virus doctor',
      '🤒': 'thermometer sick fever temperature ill',
      '🤕': 'bandage head hurt injured pain wound',
      '🤑': 'money face rich cash wealthy dollar profit',
      '🤠': 'cowboy hat western yeehaw ranch sheriff',
      '😈': 'devil purple horns evil mischievous smirk',
      '👿': 'angry devil demon upset bad furious',
      '👹': 'ogre oni monster japanese mask folklore',
      '👺': 'goblin tengu red mask long nose japanese',
      '🤡': 'clown circus funny scary party joke',
      '💩': 'poop pile poo brown stinky funny smiling',
      '👻': 'ghost spooky halloween spirit boo phantom',
      '💀': 'skull dead skeleton dying lol dead funny',
      '☠️': 'skull crossbones poison danger death pirate',
      '👽': 'alien ufo extraterrestrial martian sci fi space',
      '👾': 'alien monster video game 8bit pixel retro arcade',
      '🤖': 'robot android sci fi tech machine cyber',
      '🎃': 'jack o lantern pumpkin halloween fall spooky autumn',
      '😺': 'grinning cat smiling kitty meow feline pet',
      '😸': 'grinning cat smiling eyes meow joyful kitty',
      '😹': 'cat tears joy laughing kitty lol funny',
      '😻': 'heart eyes cat love kitten crush feline',
      '😼': 'cat wry smile smirk kitty cheeky sly',
      '😽': 'kissing cat kiss kitty feline sweet',
      '🙀': 'weary cat scream scared shock frightened horror',
      '😿': 'crying cat sad tear kitten unhappy weep',
      '😾': 'pouting cat grumpy mad angry upset feline',
      '👋': 'wave waving hello goodbye bye hi greeting',
      '🤚': 'raised back hand stop talk to hand pause',
      '🖐️': 'hand splayed five fingers stop high five',
      '✋': 'raised hand stop halt high five question answer',
      '🖖': 'vulcan salute spock star trek live long prosper',
      '👌': 'ok okay hand perfect excellent correct nice',
      '🤌': 'pinched fingers italian chef kiss what do you mean',
      '🤏': 'pinching hand small little tiny bit amount',
      '✌️': 'victory hand peace two signs deuces v sign',
      '🤞': 'crossed fingers good luck hope wish promise',
      '🫰': 'finger heart love kpop korean heart snap',
      '🤟': 'love you hand gesture sign language ily rock',
      '🤘': 'sign horns rock on metal concert party music',
      '🤙': 'call me hang loose shaka surfing phone chill',
      '👈': 'point left pointer finger left direction west',
      '👉': 'point right pointer finger right direction east',
      '👆': 'point up pointing finger top up north look',
      '🖕': 'middle finger rude insult offensive gesture',
      '👇': 'point down pointing finger bottom down south',
      '☝️': 'index pointing up finger one attention listen point',
      '🫵': 'pointing index viewer you point target choice',
      '👍': 'thumbs up good like approve yes agree great positive',
      '👎': 'thumbs down bad dislike disapprove no negative poor',
      '✊': 'raised fist solidarity power protest punch strength',
      '👊': 'oncoming fist bump bro punch fight hit impact',
      '🤛': 'left facing fist bump punch greeting hit',
      '🤜': 'right facing fist bump punch greeting hit',
      '👏': 'clapping hands applause bravo praise good job celebrate',
      '🙌': 'raising hands celebrate praise hooray yay hallelujah',
      '🫶': 'heart hands love care affection support kindness',
      '👐': 'open hands hug welcome jazz hands honest care',
      '🤲': 'palms up together pray prayer ask blessing hold',
      '🤝': 'handshake agreement deal partnership greeting meet shaking',
      '🙏': 'folded hands pray thank you please gratitude namaste hope',
      '❤️': 'red heart love passion romance affection favorite like',
      '🧡': 'orange heart care friendship warm energy love',
      '💛': 'yellow heart friendship happy bright kindness joy',
      '💚': 'green heart nature health envy eco friendly luck',
      '💙': 'blue heart trust peace loyalty calm harmony cold',
      '💜': 'purple heart royalty luxury compassion affection kpop',
      '🖤': 'black heart dark gothic sorrow grief edgy style',
      '🤍': 'white heart pure peace angel innocence clean calm',
      '🤎': 'brown heart chocolate warmth earth cocoa skin',
      '💔': 'broken heart breakup sad hurt heartbreak divorce grief',
      '❤️‍🔥': 'heart on fire passionate love burning desire intense',
      '❤️‍🩹': 'mending heart healing recovery better bandage heal',
      '❣️': 'heart exclamation love punctuation point emphasis',
      '💕': 'two hearts love sweet floating pink romance couple',
      '💞': 'revolving hearts love affection revolving swirling spin',
      '💓': 'beating heart pulse heartbeat alive excite vibration',
      '💗': 'growing heart expanding love flutter affection triple',
      '💖': 'sparkling heart shiny love glitter magical sweet',
      '💘': 'heart with arrow cupid romance love crush Valentine',
      '💝': 'heart with ribbon gift present wrapped love surprise',
      '💟': 'heart decoration square badge purple motif sign',
      '✨': 'sparkles stars magic shiny clean glitter twinkle bright',
      '⭐': 'star gold favorite rating celestial yellow space review',
      '🌟': 'glowing star shine bright sparkle special award achievement',
      '🔥': 'fire flame hot lit viral burn trend heat passion',
      '💥': 'collision explosion bang boom crash hit impact blast',
      '💯': 'hundred points 100 perfect score keep it real complete',
      '🎉': 'party popper celebration congrats celebrate congrats tada',
      '🎊': 'confetti ball celebration party festival joy fun',
      '💡': 'light bulb idea inspiration smart solution electric bright',
      '🚀': 'rocket ship launch space fast speed startup boost crypto moon',
      '🏆': 'trophy winner first place gold champion achievement award prize',
      '🎯': 'bullseye direct hit target goal focus aim accurate darts',
      '👀': 'eyes looking see watch peep curious look examine inspect',
      '🌈': 'rainbow pride colorful weather hope nature sky spectrum',
      '☀️': 'sun sunny summer bright warm daylight weather morning',
      '⚡': 'high voltage lightning bolt zap shock thunder power fast energy',
      '☕': 'coffee hot drink tea morning breakfast cafe espresso mug',
      '🍕': 'pizza slice pepperoni cheese italian food snack lunch fast food',
      '🍔': 'hamburger burger fast food beef cheeseburger snack meal',
      '🐶': 'dog puppy pet canine animal cute best friend barking',
      '🐱': 'cat kitten feline pet animal cute meow purr kitty'
    };

    this.emojiCategories = [
      {
        id: 'people',
        name: 'Smileys & People',
        emojis: [
          '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰',
          '😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳',
          '😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤',
          '😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🫣','🤭',
          '🫢','🫡','🤫','🫠','🤥','😶','🫥','😐','🫤','😑','🫨','😬','🙄','😯','😦','😧',
          '😮','😲','🥱','😴','🤤','😪','😵','😵‍💫','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕',
          '🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️','👽','👾','🤖','🎃','😺',
          '😸','😹','😻','😼','😽','🙀','😿','😾','👋','🤚','🖐️','✋','🖖','👌','🤌','🤏',
          '✌️','🤞','🫰','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','🫵','👍','👎','✊',
          '👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🤝','🙏'
        ]
      },
      {
        id: 'nature',
        name: 'Animals & Nature',
        emojis: [
          '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵',
          '🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗',
          '🐴','🦄','🐝','🪱','🐛','🦋','🐌','🐞','🐜','🪰','🪲','🪳','🦟','🦗','🕷️','🕸️',
          '🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳',
          '🐋','🦈','🦭','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘',
          '🌲','🌳','🌴','🌱','🌿','☘️','🍀','🪴','🎋','🍃','🍂','🍁','🍄','🌾','💐','🌷',
          '🌹','🥀','🌺','🌸','🌼','🌻','🌞','🌝','⭐','🌟','✨','⚡','💥','🔥','🌈','☀️',
          '🌤️','⛅','☁️','🌧️','⛈️','🌩️','🌨️','❄️','⛄','💨','💧','🫧','🌊'
        ]
      },
      {
        id: 'food',
        name: 'Food & Drinks',
        emojis: [
          '🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥',
          '🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🥐',
          '🥯','🍞','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔',
          '🍟','🍕','🥪','🥙','🌮','🌯','🥗','🥘','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟',
          '🍤','🍙','🍚','🍘','🍥','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭',
          '🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯','🥛','☕','🍵','🧃','🥤','🧋','🍺','🍻',
          '🥂','🍷','🍸','🍹','🍾','🧊'
        ]
      },
      {
        id: 'activity',
        name: 'Activities',
        emojis: [
          '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🎱','🏓','🏸','🏒','🏏','🥅','⛳','🪁',
          '🏹','🎣','🤿','🥊','🥋','🛹','🛼','⛸️','🎿','⛷️','🏂','🏋️','🤸','⛹️','🤺','🤾',
          '🏌️','🏇','🧘','🏄','🏊','🤽','🚣','🧗','🚴','🏆','🥇','🥈','🥉','🏅','🎖️','🎫',
          '🎟️','🎪','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🎻','🎲','♟️',
          '🎯','🎳','🎮','🎰','🧩'
        ]
      },
      {
        id: 'travel',
        name: 'Travel & Places',
        emojis: [
          '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🚚','🚛','🚜','🛴','🚲','🛵',
          '🏍️','🚨','🚔','🚍','🚘','🚠','🚃','🚋','🚂','🚆','🚇','🚊','🚁','✈️','🛫','🛬',
          '🚀','🛸','⛵','🚤','🛳️','⛴️','🚢','⚓','⛽','🚧','🚥','🚦','🗿','🗽','🗼','🏰',
          '🏟️','🎡','🎢','🏖️','🏝️','🌋','⛰️','🏔️','🏕️','⛺','🏠','🏡','🏢','🏬',
          '🏥','🏦','🏨','🏪','🏫','🏛️','⛪','🕌','⛩️'
        ]
      },
      {
        id: 'objects',
        name: 'Objects',
        emojis: [
          '⌚','📱','📲','💻','⌨️','🖥️','🖨️','🖱️','🕹️','💾','💿','📀','📷','📸','📹','🎥',
          '📽️','📞','☎️','📟','📠','📺','📻','🎙️','⏰','🕰️','⌛','⏳','📡','🔋','🔌','💡',
          '🔦','🕯️','💸','💵','💴','💶','💷','🪙','💰','💳','💎','⚖️','🪜','🧰','🔧','🔨',
          '⚒️','🛠️','⛏️','🔩','⚙️','🧱','⛓️','🧲','🔫','💣','🧨','🔪','🗡️','⚔️','🛡️','🔮',
          '📿','💈','⚗️','🔭','🔬','🩹','🩺','💊','💉','🧬','🧹','🧺','🧻','🚽','🚿','🛁',
          '🧼','🪥','🪒','🧽','🧴','🔑','🗝️','🚪','🪑','🛏️','🧸','🖼️','🛍️','🛒','🎁','🎈',
          '🎀','🎉','🎊','✉️','📩','📨','📧','💌','📦','🏷️','📜','📃','📄','📑','🧾','📊',
          '📈','📉','📋','📁','📂','🗂️','📰','📓','📕','📗','📘','📙','📚','📖','🔖','🔗',
          '📎','🖇️','📐','📏','📌','📍','✂️','🖊️','🖋️','✒️','🖌️','🖍️','📝','✏️','🔍','🔎',
          '🔒','🔓'
        ]
      },
      {
        id: 'symbols',
        name: 'Symbols',
        emojis: [
          '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','❣️','💕','💞','💓',
          '💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐',
          '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','☢️','☣️','📴',
          '📳','🈶','🈚','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🅾️',
          '🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','❗️','❕','❓','❔','‼️','⁉️',
          '⚠️','🚸','🔱','⚜️','🔰','♻️','✅','❇️','✳️','❎','🌐','💠','🌀','💤','🏧','🚾',
          '♿','🅿️','🈳','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','🚻','🚮','🎦','📶','🈁',
          '🆖','🆗','🆙','🆒','🆕','🆓','0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣',
          '🔟','🔢','#️⃣','*️⃣','▶️','⏸️','⏯️','⏹️','⏺️','⏭️','⏮️','⏩','⏪','⏫','⏬','◀️',
          '🔼','🔽','➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️','🔄','↪️','↩️','⤴️',
          '⤵️','🔀','🔁','🔂','🎵','🎶','➕','➖','➗','✖️','🟰','♾️','💲','💱','™️','©️',
          '®️','✔️','☑️','🔘','🔴','🟠','🟡','🟢','🔵','🟣','⚫','⚪','🟤','🔺','🔻','🔸',
          '🔹','🔶','🔷','▫️','▪️','◽','◾','◻️','◼️','🟥','🟧','🟨','🟩','🟦','🟪','⬛',
          '⬜','🟫','🔈','🔇','🔉','🔊','🔔','🔕','📣','📢','💬','💭','🗯️','♠️','♣️','♥️',
          '♦️','🃏'
        ]
      },
      {
        id: 'flags',
        name: 'Flags',
        emojis: [
          '🚩','🎌','🏁','🏴','🏳️','🏳️‍🌈','🏳️‍⚧️','🏴‍☠️','🇦🇺','🇧🇷','🇨🇦','🇨🇳','🇩🇪','🇪🇸','🇫🇷','🇬🇧',
          '🇮🇳','🇮🇩','🇮🇹','🇯🇵','🇰🇷','🇲🇽','🇳🇱','🇵🇭','🇷🇺','🇸🇦','🇸🇬','🇺🇸','🇻🇳','🇿🇦'
        ]
      }
    ];

    this.renderEmojiPickerGrid('');

    // Tab buttons
    this.emojiCategoryTabs.querySelectorAll('.emoji-cat-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        const catId = tab.dataset.cat;
        this.selectEmojiCategory(catId);
      });
    });

    // Search filter
    this.emojiSearchInput.addEventListener('input', () => {
      const q = this.emojiSearchInput.value.trim().toLowerCase();
      this.emojiSearchClearBtn.hidden = !q;
      this.renderEmojiPickerGrid(q);
    });

    // Clear search
    this.emojiSearchClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.emojiSearchInput.value = '';
      this.emojiSearchClearBtn.hidden = true;
      this.renderEmojiPickerGrid('');
    });

    // Prevent clicks inside picker from bubbling
    this.emojiPickerPopover.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  renderEmojiPickerGrid(filterText = '') {
    if (!this.emojiPickerContent) return;
    let html = '';
    const q = filterText.toLowerCase();

    this.emojiCategories.forEach(cat => {
      let filtered = cat.emojis;
      if (q) {
        filtered = cat.emojis.filter(em => {
          const kw = this.emojiKeywords && this.emojiKeywords[em] ? this.emojiKeywords[em] : '';
          return cat.name.toLowerCase().includes(q) || kw.toLowerCase().includes(q) || em === q;
        });
      }

      if (filtered.length > 0) {
        html += `<div class="emoji-category-section" id="emojiSec_${cat.id}">`;
        html += `<div class="emoji-category-title">${this.escapeHtml(cat.name)}</div>`;
        html += `<div class="emoji-grid">`;
        filtered.forEach(em => {
          const hex = em.codePointAt(0).toString(16);
          html += `<button type="button" class="emoji-item-btn" data-emoji="${this.escapeHtml(em)}" data-testid="emoji-icon-${hex}" aria-label="Emoji ${em}">${em}</button>`;
        });
        html += `</div></div>`;
      }
    });

    if (!html) {
      html = `<div style="text-align: center; color: #9ca3af; padding: 40px 16px; font-size: 13px;">No emojis found</div>`;
    }

    this.emojiPickerContent.innerHTML = html;

    // Attach click listeners to all emoji buttons
    this.emojiPickerContent.querySelectorAll('.emoji-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const em = btn.dataset.emoji;
        if (em && this.activeEmojiCardId) {
          this.toggleCardEmojiReaction(this.activeEmojiCardId, em);
          this.closeEmojiPicker();
        }
      });
    });
  }

  selectEmojiCategory(catId) {
    if (!this.emojiCategoryTabs) return;
    this.emojiCategoryTabs.querySelectorAll('.emoji-cat-tab').forEach(t => {
      t.classList.toggle('is-active', t.dataset.cat === catId);
    });
    const sec = document.getElementById(`emojiSec_${catId}`);
    if (sec && this.emojiPickerContent) {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openEmojiPicker(anchorElement, cardId) {
    if (!this.emojiPickerPopover) return;
    this.closeAllPopovers();

    this.activeEmojiCardId = cardId;
    if (this.emojiSearchInput) {
      this.emojiSearchInput.value = '';
    }
    if (this.emojiSearchClearBtn) {
      this.emojiSearchClearBtn.hidden = true;
    }
    this.renderEmojiPickerGrid('');

    // Position popover intelligently relative to anchorElement
    const rect = anchorElement.getBoundingClientRect();
    const popoverWidth = 336;
    const popoverHeight = 377;
    const margin = 8;

    let left = rect.left;
    if (left + popoverWidth > window.innerWidth - margin) {
      left = window.innerWidth - popoverWidth - margin;
    }
    if (left < margin) left = margin;

    let top = rect.bottom + 6;
    if (top + popoverHeight > window.innerHeight - margin) {
      top = rect.top - popoverHeight - 6;
    }
    if (top < margin) top = margin;

    this.emojiPickerPopover.style.left = `${Math.round(left)}px`;
    this.emojiPickerPopover.style.top = `${Math.round(top)}px`;
    this.emojiPickerPopover.hidden = false;
  }

  closeEmojiPicker() {
    if (this.emojiPickerPopover) {
      this.emojiPickerPopover.hidden = true;
      this.activeEmojiCardId = null;
    }
  }

  toggleCardEmojiReaction(cardId, emoji) {
    const card = this.findCardById(cardId);
    if (!card) return;

    if (!card.emojiReactions || typeof card.emojiReactions !== 'object') {
      card.emojiReactions = {};
      if (card.reactions > 0) {
        card.emojiReactions['❤️'] = { count: card.reactions, userReacted: !!card.hasReacted };
      }
    }

    if (card.emojiReactions[emoji]) {
      if (card.emojiReactions[emoji].userReacted) {
        card.emojiReactions[emoji].count -= 1;
        card.emojiReactions[emoji].userReacted = false;
        if (card.emojiReactions[emoji].count <= 0) {
          delete card.emojiReactions[emoji];
        }
      } else {
        card.emojiReactions[emoji].count += 1;
        card.emojiReactions[emoji].userReacted = true;
      }
    } else {
      card.emojiReactions[emoji] = { count: 1, userReacted: true };
    }

    // Update aggregate reactions count & user reacted state
    const allCounts = Object.values(card.emojiReactions).map(r => r.count || 0);
    card.reactions = allCounts.reduce((a, b) => a + b, 0);
    card.hasReacted = Object.values(card.emojiReactions).some(r => r.userReacted);

    this.saveState();
    this.renderBoard();
    if (this.cardDetailModal && !this.cardDetailModal.hidden && this.activeDetailCardId === cardId) {
      if (this.detailReactionBtn) {
        this.detailReactionBtn.classList.toggle('has-reacted', !!card.hasReacted);
      }
      if (this.detailReactionCount) {
        this.detailReactionCount.textContent = card.reactions > 0 ? card.reactions : '+';
      }
    }
    this.showToast('Reaction updated');

    if (this.backend && this.backend.addReaction) {
      this.backend.addReaction(card.id);
    }
  }

  /* ========================================================================
     Section Column Context Menu (Blueprint Section 2.2: 13-Item Actions)
     ======================================================================== */

  initSectionContextMenu() {
    if (!this.sectionContextMenu) return;

    this.sectionContextMenu.querySelectorAll('.menu-action-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const sectionId = this.activeSectionContextId;
        const sectionIndex = this.state.sections.findIndex(s => s.id === sectionId);
        const section = this.state.sections[sectionIndex];

        this.closeSectionContextMenu();
        if (!section && action !== 'add-post') return;

        switch (action) {
          case 'add-post':
            this.openComposer(sectionId);
            break;
          case 'start-slideshow':
            this.showToast(`Starting slideshow from ${section.title}`);
            break;
          case 'new-section-left': {
            const nextNum = this.state.sections.length + 1;
            const newSec = { id: 'sec-' + Date.now(), title: `Section ${nextNum}`, cards: [] };
            this.state.sections.splice(sectionIndex, 0, newSec);
            this.saveState();
            this.renderBoard();
            this.showToast(`Created section to the left`);
            if (this.backend && this.backend.isConnected) {
              this.backend.createSection(newSec);
            }
            break;
          }
          case 'new-section-right': {
            const nextNum = this.state.sections.length + 1;
            const newSec = { id: 'sec-' + Date.now(), title: `Section ${nextNum}`, cards: [] };
            this.state.sections.splice(sectionIndex + 1, 0, newSec);
            this.saveState();
            this.renderBoard();
            this.showToast(`Created section to the right`);
            if (this.backend && this.backend.isConnected) {
              this.backend.createSection(newSec);
            }
            break;
          }
          case 'move-section-right': {
            if (sectionIndex < this.state.sections.length - 1) {
              const [removed] = this.state.sections.splice(sectionIndex, 1);
              this.state.sections.splice(sectionIndex + 1, 0, removed);
              this.saveState();
              this.renderBoard();
              this.showToast(`Moved section right`);
            } else {
              this.showToast(`Already at the rightmost position`);
            }
            break;
          }
          case 'rename-section': {
            const newTitle = prompt('Enter new section name:', section.title);
            if (newTitle && newTitle.trim()) {
              section.title = newTitle.trim();
              this.saveState();
              this.renderBoard();
              this.updateSectionSelectorUI();
              this.showToast(`Renamed to ${section.title}`);
              if (this.backend && this.backend.isConnected) {
                this.backend.renameSection(section.id, section.title);
              }
            }
            break;
          }
          case 'make-default':
            this.state.sections.forEach(s => s.isDefault = (s.id === sectionId));
            this.saveState();
            this.showToast(`${section.title} is now default section`);
            break;
          case 'copy-section-name':
            navigator.clipboard?.writeText(section.title);
            this.showToast('Section name copied to clipboard!');
            break;
          case 'copy-breakout-link':
            navigator.clipboard?.writeText(`${window.location.href.split('#')[0]}#sec-${section.id}`);
            this.showToast('Breakout room link copied!');
            break;
          case 'delete-section': {
            if (this.state.sections.length <= 1) {
              alert('Cannot delete the only section on the board.');
              return;
            }
            if (confirm(`Are you sure you want to delete "${section.title}" and all its posts?`)) {
              this.state.sections = this.state.sections.filter(s => s.id !== sectionId);
              this.saveState();
              this.renderBoard();
              this.updateSectionSelectorUI();
              this.showToast(`Deleted ${section.title}`);
              if (this.backend && this.backend.isConnected) {
                this.backend.deleteSection(sectionId);
              }
            }
            break;
          }
        }
      });
    });
  }

  openSectionContextMenu(sectionId, targetEl) {
    this.closeAllPopovers();
    this.activeSectionContextId = sectionId;
    if (!this.sectionContextMenu || !targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    const menuWidth = 270;
    let left = rect.left;
    if (left + menuWidth > window.innerWidth - 16) {
      left = window.innerWidth - menuWidth - 16;
    }
    this.sectionContextMenu.style.top = `${rect.bottom + 6}px`;
    this.sectionContextMenu.style.left = `${Math.max(12, left)}px`;
    this.sectionContextMenu.hidden = false;
  }

  closeSectionContextMenu() {
    if (this.sectionContextMenu) {
      this.sectionContextMenu.hidden = true;
    }
    this.activeSectionContextId = null;
  }

  /* ========================================================================
     Card 3-Dots Context Menu (Padlet Authentic 14-Item Menu & 6 Swatches)
     ======================================================================== */

  initCardContextMenu() {
    if (!this.cardContextMenu) return;

    this.cardContextMenu.querySelectorAll('.menu-action-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const card = this.activeContextCard;
        if (!card) {
          this.closeCardContextMenu();
          return;
        }

        const data = this.findCardAndSection(card.id);
        const section = data ? data.section : null;

        this.closeCardContextMenu();

        switch (action) {
          case 'open-post':
            this.openCardDetailModal(card.id);
            break;

          case 'open-new-tab':
            window.open(window.location.href, '_blank');
            this.showToast('Opened post in new tab');
            break;

          case 'copy-link':
            navigator.clipboard?.writeText(`${window.location.href.split('#')[0]}#${card.id}`);
            this.showToast('Post link copied to clipboard!');
            break;

          case 'start-slideshow':
            this.showToast(`Starting slideshow from "${card.title || 'post'}"`);
            break;

          case 'edit-post':
            this.editPost(card.id);
            break;

          case 'add-post-before': {
            if (section) {
              this.openComposer(section.id);
              this.showToast(`Adding post before "${card.title || 'post'}"`);
            }
            break;
          }

          case 'add-post-after': {
            if (section) {
              this.openComposer(section.id);
              this.showToast(`Adding post after "${card.title || 'post'}"`);
            }
            break;
          }

          case 'duplicate-post': {
            if (section) {
              const cardIdx = section.cards.findIndex(c => c.id === card.id);
              const clone = JSON.parse(JSON.stringify(card));
              clone.id = 'card-' + Date.now();
              clone.title = (clone.title || 'Post') + ' (Copy)';
              clone.pinned = false;
              clone.reactions = 0;
              clone.hasReacted = false;
              section.cards.splice(cardIdx + 1, 0, clone);
              this.saveState();
              this.renderBoard();
              this.showToast('Post duplicated!');
              if (this.backend && this.backend.isConnected) {
                this.backend.createPost(clone, section.id);
              }
            }
            break;
          }

          case 'copy-to-another':
            this.showToast('Copied post to clipboard!');
            break;

          case 'transfer-to-another':
            this.showToast('Transfer dialog ready');
            break;

          case 'toggle-pin': {
            card.pinned = !card.pinned;
            this.saveState();
            this.renderBoard();
            this.showToast(card.pinned ? 'Post pinned to top' : 'Post unpinned');
            if (this.backend && this.backend.isConnected) {
              this.backend.updatePost(card);
            }
            break;
          }

          case 'delete-post': {
            if (section) {
              section.cards = section.cards.filter(c => c.id !== card.id);
              this.saveState();
              this.renderBoard();
              this.showToast('Post deleted');
              if (this.backend && this.backend.isConnected) {
                this.backend.deletePost(card.id);
              }
            }
            break;
          }
        }
      });
    });
  }

  openCardContextMenu(card, targetEl, mouseEvent = null) {
    this.closeAllPopovers();
    this.activeContextCard = card;
    if (!this.cardContextMenu) return;

    this.renderCardMenuColors(card);

    if (this.pinActionLabel) {
      this.pinActionLabel.textContent = card.pinned ? 'Unpin post' : 'Pin post';
    }

    const menuWidth = 256;
    this.cardContextMenu.style.visibility = 'hidden';
    this.cardContextMenu.hidden = false;
    const menuHeight = this.cardContextMenu.offsetHeight || 440;
    this.cardContextMenu.style.visibility = 'visible';

    let left, top;
    if (mouseEvent && typeof mouseEvent.clientX === 'number') {
      left = mouseEvent.clientX;
      top = mouseEvent.clientY;
      if (left + menuWidth > window.innerWidth - 12) {
        left = Math.max(12, window.innerWidth - menuWidth - 12);
      }
      if (top + menuHeight > window.innerHeight - 12) {
        top = Math.max(12, mouseEvent.clientY - menuHeight);
      }
    } else if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      left = rect.right - menuWidth;
      if (left < 12) left = 12;
      if (left + menuWidth > window.innerWidth - 12) {
        left = window.innerWidth - menuWidth - 12;
      }
      top = rect.bottom + 6;
      if (top + menuHeight > window.innerHeight - 12) {
        const topAbove = rect.top - menuHeight - 6;
        if (topAbove >= 12 && topAbove + menuHeight <= window.innerHeight - 12) {
          top = topAbove;
        } else {
          top = Math.max(12, window.innerHeight - menuHeight - 12);
        }
      }
    } else {
      left = 12;
      top = 12;
    }

    left = Math.max(12, Math.min(left, window.innerWidth - menuWidth - 12));
    top = Math.max(12, Math.min(top, window.innerHeight - menuHeight - 12));

    this.cardContextMenu.style.top = `${top}px`;
    this.cardContextMenu.style.left = `${left}px`;
  }

  closeCardContextMenu() {
    if (this.cardContextMenu) {
      this.cardContextMenu.hidden = true;
    }
    this.activeContextCard = null;
  }

  renderCardMenuColors(card) {
    if (!this.cardMenuColorRow) return;
    this.cardMenuColorRow.innerHTML = '';

    const activeColor = card.color || 'white';

    PALETTES.forEach(pal => {
      const circle = document.createElement('button');
      circle.type = 'button';
      circle.className = `menu-color-circle ${pal.id === activeColor ? 'is-active' : ''}`;
      circle.style.backgroundColor = pal.dot;
      circle.title = pal.name;
      circle.setAttribute('aria-label', `Color ${pal.name}`);

      if (pal.id === 'white') {
        circle.style.border = '1.5px solid rgba(255, 255, 255, 0.4)';
      }

      if (pal.id === activeColor) {
        circle.innerHTML = `
          <svg viewBox="0 0 24 24" width="12" height="12" fill="${pal.id === 'white' ? '#111' : '#111'}">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        `;
      }

      circle.addEventListener('click', (e) => {
        e.stopPropagation();
        card.color = pal.id;
        this.saveState();
        this.renderBoard();
        this.renderCardMenuColors(card);
        this.showToast(`Post color set to ${pal.name}`);

        if (this.backend && this.backend.isConnected) {
          this.backend.updatePost(card);
        }
      });

      this.cardMenuColorRow.appendChild(circle);
    });
  }

  /* ========================================================================
     Post Detail / Expanded Theater View Modal (Padlet Authentic Fullscreen)
     ======================================================================== */

  initCardDetailModal() {
    if (!this.cardDetailModal) return;

    if (this.closeDetailModalBtn) {
      this.closeDetailModalBtn.addEventListener('click', () => this.closeCardDetailModal());
    }

    this.cardDetailModal.addEventListener('click', (e) => {
      if (e.target === this.cardDetailModal) {
        this.closeCardDetailModal();
      }
    });

    if (this.detailReactionBtn) {
      this.detailReactionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = this.findCardById(this.activeDetailCardId);
        if (!card) return;
        this.openEmojiPicker(this.detailReactionBtn, card.id);
      });
    }

    if (this.detailCommentForm) {
      this.detailCommentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.detailCommentInput ? this.detailCommentInput.value.trim() : '';
        if (!text) return;
        const card = this.findCardById(this.activeDetailCardId);
        if (!card) return;

        if (!card.comments) card.comments = [];
        card.comments.push({
          id: 'comment-' + Date.now(),
          author: 'You',
          text: text,
          timestamp: 'Just now'
        });

        if (this.detailCommentInput) this.detailCommentInput.value = '';
        this.saveState();
        this.renderDetailComments(card);
        this.showToast('Comment added!');

        if (this.backend && this.backend.isConnected) {
          this.backend.addComment(card.id, 'Salman Madani', text);
        }
      });
    }

    if (this.detailNextBtn) {
      this.detailNextBtn.addEventListener('click', () => this.navigateDetailModal(1));
    }

    if (this.detailPrevBtn) {
      this.detailPrevBtn.addEventListener('click', () => this.navigateDetailModal(-1));
    }
  }

  openCardDetailModal(cardId) {
    const data = this.findCardAndSection(cardId);
    if (!data) return;
    const { card, section } = data;

    this.activeDetailCardId = card.id;

    if (this.detailSectionTitle) this.detailSectionTitle.textContent = section.title;
    if (this.detailPostSubject) this.detailPostSubject.textContent = card.title || 'Untitled Post';

    if (this.detailMediaCanvas) {
      this.detailMediaCanvas.innerHTML = '';
      if (card.attachment) {
        const att = card.attachment;
        if (att.type === 'poll') {
          const votedOptions = JSON.parse(localStorage.getItem(`padles_voted_${card.id}`) || '[]');
          const totalVotes = att.totalVotes || 0;
          let optionsHtml = '';
          (att.options || []).forEach(opt => {
            const isVoted = votedOptions.includes(opt.id);
            const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
            optionsHtml += `
              <button type="button" class="card-poll-option-btn ${isVoted ? 'has-voted' : ''}" data-poll-card="${card.id}" data-opt-id="${opt.id}" style="padding:12px 16px; font-size:14px; margin-bottom:8px;">
                <div class="card-poll-bar-fill" style="width: ${pct}%"></div>
                <span class="card-poll-option-text">${this.escapeHtml(opt.text)}</span>
                <span class="card-poll-option-pct">${pct}% (${opt.votes || 0})</span>
              </button>
            `;
          });
          this.detailMediaCanvas.innerHTML = `
            <div style="width:100%; max-width:520px; background:#ffffff; border-radius:18px; padding:24px; box-shadow:0 16px 40px rgba(0,0,0,0.5); color:#111111;">
              <h2 style="font-size:1.35rem; font-weight:700; margin-bottom:16px; color:#111111;">${this.escapeHtml(att.question || 'Poll')}</h2>
              <div class="card-poll-options">${optionsHtml}</div>
              <div style="font-size:13px; color:#6b7280; margin-top:10px; text-align:right;">
                ${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'}${att.allowMultiple ? ' • Multiple choices allowed' : ''}
              </div>
            </div>
          `;
          this.detailMediaCanvas.querySelectorAll('.card-poll-option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const cardId = btn.dataset.pollCard;
              const optId = btn.dataset.optId;
              if (cardId && optId) this.voteOnPoll(cardId, optId);
            });
          });
        } else if (att.type === 'audio') {
          this.detailMediaCanvas.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:20px; width:90%; max-width:520px; background:rgba(255,255,255,0.08); backdrop-filter:blur(16px); padding:36px 24px; border-radius:24px;">
              <div style="width:80px; height:80px; border-radius:50%; background:rgba(222,49,99,0.25); color:#ff4081; display:flex; align-items:center; justify-content:center;">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" stroke-width="2"/></svg>
              </div>
              <h3 style="color:#ffffff; font-size:18px; margin:0;">${this.escapeHtml(att.title || 'Audio Reflection')}</h3>
              <audio src="${this.escapeHtml(att.url)}" controls autoplay style="width:100%; max-width:440px;"></audio>
            </div>
          `;
        } else if (att.type === 'location') {
          const embedUrl = att.embedUrl || (att.latitude && att.longitude ? `https://www.openstreetmap.org/export/embed.html?bbox=${att.longitude - 0.01}%2C${att.latitude - 0.01}%2C${att.longitude + 0.01}%2C${att.latitude + 0.01}&layer=mapnik&marker=${att.latitude}%2C${att.longitude}` : '');
          this.detailMediaCanvas.innerHTML = `
            <div style="width:90%; max-width:720px; height:60vh; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 16px 40px rgba(0,0,0,0.5); display:flex; flex-direction:column;">
              ${embedUrl ? `<iframe src="${this.escapeHtml(embedUrl)}" style="flex:1; width:100%; border:none;"></iframe>` : ''}
              <div style="padding:14px 20px; background:#ffffff; display:flex; align-items:center; justify-content:space-between;">
                <span style="color:#111111; font-weight:600; font-size:14px;">${this.escapeHtml(att.title || 'Location')}</span>
                ${att.mapUrl ? `<a href="${this.escapeHtml(att.mapUrl)}" target="_blank" rel="noopener noreferrer" style="color:#de3163; font-weight:600; text-decoration:none; font-size:13px;">Open on OpenStreetMap ↗</a>` : ''}
              </div>
            </div>
          `;
        } else if (att.type === 'video' || att.provider === 'Video Recorder' || att.provider === 'Screen Recorder' || att.category === 'Video Recording' || att.category === 'Screen Recording') {
          if (att.url && !att.videoUrl) {
            this.detailMediaCanvas.innerHTML = `
              <video src="${this.escapeHtml(att.url)}" controls autoplay playsinline style="max-height:68vh; max-width:90%; border-radius:16px; box-shadow:0 16px 40px rgba(0,0,0,0.7);"></video>
            `;
          } else {
            this.detailMediaCanvas.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;gap:16px;max-width:85%;">
                <img src="${this.escapeHtml(att.thumbnailUrl || att.url)}" style="border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,0.7);max-height:65vh;" alt="${this.escapeHtml(att.caption || '')}" />
                <a href="${att.videoUrl || 'https://youtube.com'}" target="_blank" class="detail-reaction-btn" style="background:#ff0000;color:#fff;text-decoration:none;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  Watch on YouTube
                </a>
              </div>
            `;
          }
        } else if (card.type === 'link') {
          this.detailMediaCanvas.innerHTML = `
            <div class="detail-text-presentation">
              <img src="${this.escapeHtml(att.thumbnailUrl || att.url)}" style="width:100%;border-radius:12px;margin-bottom:16px;" alt="${this.escapeHtml(att.title || '')}" />
              <h3>${this.escapeHtml(att.title || '')}</h3>
              <p style="color:rgba(255,255,255,0.7);margin-top:8px;">${this.escapeHtml(att.domain || '')}</p>
            </div>
          `;
        } else if (att.thumbnailUrl || att.url) {
          this.detailMediaCanvas.innerHTML = `
            <img src="${this.escapeHtml(att.url || att.thumbnailUrl)}" style="max-height:70vh; max-width:90%; border-radius:16px; object-fit:contain; box-shadow:0 16px 40px rgba(0,0,0,0.6);" alt="Media attachment" />
          `;
        }
      } else {
        let bodyHtml = '';
        if (card.content) {
          if (card.content.intro) bodyHtml += `<p style="margin-bottom:12px;">${card.content.intro}</p>`;
          if (card.content.body) bodyHtml += `<p style="margin-bottom:12px;">${card.content.body}</p>`;
          if (card.content.bullets) {
            bodyHtml += `<ul style="padding-left:20px;display:flex;flex-direction:column;gap:8px;">${card.content.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
          }
        }
        this.detailMediaCanvas.innerHTML = `
          <div class="detail-text-presentation">
            <h2 style="font-size:1.6rem;font-weight:800;margin-bottom:16px;">${this.escapeHtml(card.title || '')}</h2>
            <div>${bodyHtml || '<p>No additional content</p>'}</div>
          </div>
        `;
      }
    }

    if (this.detailPostBody) {
      let sidebarBody = '';
      if (card.content) {
        if (card.content.intro) sidebarBody += `<p>${card.content.intro}</p>`;
        if (card.content.body) sidebarBody += `<p>${card.content.body}</p>`;
        if (card.content.bullets) {
          sidebarBody += `<ul>${card.content.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
        }
      } else if (card.attachment && card.attachment.caption) {
        sidebarBody = `<p>${this.escapeHtml(card.attachment.caption)}</p>`;
      }
      this.detailPostBody.innerHTML = sidebarBody || '<p style="color:rgba(255,255,255,0.5);">No description</p>';
    }

    if (this.detailCustomFieldsBox) {
      this.detailCustomFieldsBox.innerHTML = '';
      if (card.customFieldValues && Object.keys(card.customFieldValues).length > 0) {
        for (const [cfId, val] of Object.entries(card.customFieldValues)) {
          if (val !== undefined && val !== null && val !== '') {
            const fieldDef = (this.state.customFields || []).find(f => f.id === cfId);
            const fieldName = fieldDef ? fieldDef.name : 'Field';
            let displayVal = val;
            if (fieldDef && fieldDef.type === 'rating') {
              const num = Math.min(10, Math.max(1, parseInt(val, 10) || 0));
              displayVal = '★'.repeat(num);
            }
            const chip = document.createElement('div');
            chip.className = 'card-cf-chip';
            chip.style.margin = '4px 0';
            chip.innerHTML = `<strong>${this.escapeHtml(fieldName)}:</strong> ${this.escapeHtml(String(displayVal))}`;
            this.detailCustomFieldsBox.appendChild(chip);
          }
        }
      }
    }

    if (this.detailReactionBtn) {
      this.detailReactionBtn.classList.toggle('has-reacted', !!card.hasReacted);
    }
    if (this.detailReactionCount) {
      this.detailReactionCount.textContent = card.reactions > 0 ? card.reactions : '+';
    }

    this.renderDetailComments(card);

    const allCards = this.getAllCards();
    const currentIdx = allCards.findIndex(item => item.card.id === card.id);
    if (this.detailCurrentNum) this.detailCurrentNum.textContent = currentIdx >= 0 ? currentIdx + 1 : 1;
    if (this.detailTotalNum) this.detailTotalNum.textContent = allCards.length;

    this.cardDetailModal.hidden = false;
  }

  closeCardDetailModal() {
    if (this.cardDetailModal) {
      this.cardDetailModal.hidden = true;
    }
    if (this.detailMediaCanvas) {
      this.detailMediaCanvas.innerHTML = '';
    }
    this.activeDetailCardId = null;
  }

  renderDetailComments(card) {
    if (!this.detailCommentsList) return;
    this.detailCommentsList.innerHTML = '';

    const comments = card.comments || [];
    if (comments.length === 0) {
      this.detailCommentsList.innerHTML = '<div style="font-size:0.8rem;color:rgba(255,255,255,0.4);font-style:italic;">No comments yet. Be the first to comment!</div>';
      return;
    }

    comments.forEach(c => {
      const bubble = document.createElement('div');
      bubble.className = 'detail-comment-bubble';
      bubble.innerHTML = `
        <div class="detail-comment-author">${this.escapeHtml(c.author || 'User')} <span style="font-weight:400;color:rgba(255,255,255,0.4);margin-left:6px;font-size:0.7rem;">${c.timestamp || ''}</span></div>
        <div class="detail-comment-text">${this.escapeHtml(c.text)}</div>
      `;
      this.detailCommentsList.appendChild(bubble);
    });

    this.detailCommentsList.scrollTop = this.detailCommentsList.scrollHeight;
  }

  navigateDetailModal(direction) {
    const allCards = this.getAllCards();
    if (allCards.length === 0) return;

    let idx = allCards.findIndex(item => item.card.id === this.activeDetailCardId);
    if (idx === -1) idx = 0;

    let nextIdx = idx + direction;
    if (nextIdx < 0) nextIdx = allCards.length - 1;
    if (nextIdx >= allCards.length) nextIdx = 0;

    this.openCardDetailModal(allCards[nextIdx].card.id);
  }

  getAllCards() {
    const list = [];
    this.state.sections.forEach(s => {
      s.cards.forEach(c => list.push({ card: c, section: s }));
    });
    return list;
  }

  findCardAndSection(cardId) {
    for (const section of this.state.sections) {
      const card = section.cards.find(c => c.id === cardId);
      if (card) return { card, section };
    }
    return null;
  }

  findCardById(cardId) {
    const data = this.findCardAndSection(cardId);
    return data ? data.card : null;
  }

  /* ========================================================================
     Schedule Post Modal (Blueprint Section 5.2)
     ======================================================================== */

  initScheduleModal() {
    if (!this.schedulePostModal) return;

    if (this.schedulePostBtn) {
      this.schedulePostBtn.addEventListener('click', () => this.openScheduleModal());
    }
    if (this.closeScheduleBtn) {
      this.closeScheduleBtn.addEventListener('click', () => this.closeScheduleModal());
    }
    if (this.cancelScheduleBtn) {
      this.cancelScheduleBtn.addEventListener('click', () => this.closeScheduleModal());
    }
    if (this.confirmScheduleBtn) {
      this.confirmScheduleBtn.addEventListener('click', () => this.confirmSchedule());
    }

    this.schedulePostModal.addEventListener('click', (e) => {
      if (e.target === this.schedulePostModal) {
        this.closeScheduleModal();
      }
    });
  }

  openScheduleModal() {
    this.closeAllPopovers();
    if (!this.schedulePostModal) return;

    const now = new Date();
    now.setHours(now.getHours() + 1);
    const pad = (n) => String(n).padStart(2, '0');
    const isoLocal = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    if (this.scheduleDateTimeInput) {
      this.scheduleDateTimeInput.value = isoLocal;
    }
    if (this.scheduleTimezoneText) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.scheduleTimezoneText.textContent = `Timezone: ${tz}`;
      } catch {
        this.scheduleTimezoneText.textContent = 'Timezone: Local time';
      }
    }
    this.schedulePostModal.hidden = false;
  }

  closeScheduleModal() {
    if (this.schedulePostModal) {
      this.schedulePostModal.hidden = true;
    }
  }

  confirmSchedule() {
    const val = this.scheduleDateTimeInput ? this.scheduleDateTimeInput.value : null;
    if (!val) {
      alert('Please select a valid date and time.');
      return;
    }
    const d = new Date(val);
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(dr => dr.id === this.activeDraftId);
      if (draft) {
        draft.scheduledAt = val;
        this.saveState();
      }
    }
    this.closeScheduleModal();
    this.showToast(`Post scheduled for ${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  }

  /* ========================================================================
     All Tools Modal (Blueprint Section 5.1: 21 Built-In Tools)
     ======================================================================== */

  initAllToolsModal() {
    if (!this.allToolsModal) return;

    if (this.closeAllToolsBtn) {
      this.closeAllToolsBtn.addEventListener('click', () => this.closeAllToolsModal());
    }

    this.allToolsModal.addEventListener('click', (e) => {
      if (e.target === this.allToolsModal) {
        this.closeAllToolsModal();
      }
    });

    if (this.allToolsSearchInput) {
      this.allToolsSearchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        this.handleAllToolsSearchInput(val);
      });

      this.allToolsSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.submitAllToolsUrlOrFirstMatch();
        }
      });
    }

    if (this.allToolsPasteBtn) {
      this.allToolsPasteBtn.addEventListener('click', async () => {
        try {
          const text = await navigator.clipboard.readText();
          if (text) {
            if (this.allToolsSearchInput) {
              this.allToolsSearchInput.value = text;
              this.handleAllToolsSearchInput(text);
            }
          }
        } catch (e) {
          this.showToast('Unable to read clipboard');
        }
      });
    }

    if (this.allToolsUrlSubmitBtn) {
      this.allToolsUrlSubmitBtn.addEventListener('click', () => {
        this.submitAllToolsUrlOrFirstMatch();
      });
    }

    this.renderAllToolsGrid();
  }

  isValidUrl(text) {
    if (!text) return false;
    try {
      const u = new URL(text);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  }

  handleAllToolsSearchInput(val) {
    const isUrl = this.isValidUrl(val);
    if (this.allToolsUrlSubmitBtn) {
      this.allToolsUrlSubmitBtn.style.display = isUrl ? 'flex' : 'none';
    }
    if (this.allToolsPasteBtn) {
      this.allToolsPasteBtn.style.display = isUrl ? 'none' : 'flex';
    }
    this.renderAllToolsGrid(val);
  }

  submitAllToolsUrlOrFirstMatch() {
    const val = (this.allToolsSearchInput?.value || '').trim();
    if (this.isValidUrl(val)) {
      this.closeAllToolsModal();
      this.attachDirectUrl(val);
    }
  }

  attachDirectUrl(url) {
    try {
      const domain = new URL(url).hostname;
      this.composerState.attachment = {
        type: 'link',
        provider: domain,
        title: url,
        domain: domain,
        thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
        url: url
      };
      this.updateAttachmentPreviewUI();
      this.showToast(`Link attached: ${domain}`);
    } catch (e) {
      this.showToast('Invalid URL');
    }
  }

  openAllToolsModal() {
    this.closeAllPopovers();
    if (!this.allToolsModal) return;
    if (this.allToolsSearchInput) {
      this.allToolsSearchInput.value = '';
    }
    if (this.allToolsUrlSubmitBtn) {
      this.allToolsUrlSubmitBtn.style.display = 'none';
    }
    if (this.allToolsPasteBtn) {
      this.allToolsPasteBtn.style.display = 'flex';
    }
    this.renderAllToolsGrid();
    this.allToolsModal.hidden = false;
    setTimeout(() => this.allToolsSearchInput?.focus(), 50);
  }

  closeAllToolsModal() {
    if (this.allToolsModal) {
      this.allToolsModal.hidden = true;
    }
  }

  renderAllToolsGrid(filter = '') {
    const container = this.allToolsGroupsContainer || this.allToolsGrid;
    if (!container) return;
    container.innerHTML = '';
    const q = filter.toLowerCase().trim();

    TOOL_GROUPS.forEach(group => {
      const matchingTools = group.tools.filter(t => !q || t.name.toLowerCase().includes(q));
      if (matchingTools.length === 0) return;

      const groupGrid = document.createElement('div');
      groupGrid.className = 'all-tools-group-grid';

      matchingTools.forEach(tool => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'all-tools-btn';
        btn.setAttribute('data-tool', tool.id);
        btn.setAttribute('data-testid', tool.testid);
        btn.setAttribute('aria-label', tool.ariaLabel);

        btn.innerHTML = `
          <span class="all-tools-btn-icon text-${tool.colorClass}">${tool.svg}</span>
          <span class="all-tools-btn-label">${tool.name}</span>
          ${tool.isNew ? '<span class="all-tools-badge-new">New</span>' : ''}
        `;

        btn.addEventListener('click', () => {
          this.closeAllToolsModal();
          this.triggerToolAction(tool.id);
        });

        groupGrid.appendChild(btn);
      });

      container.appendChild(groupGrid);
    });
  }

  triggerToolAction(toolId) {
    switch (toolId) {
      case 'padles':
      case 'padlet':
        this.composerState.attachment = {
          type: 'padles',
          provider: 'Padles Board',
          title: 'Quantum Mechanics Lab — Padles',
          domain: 'padles.com',
          thumbnailUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Padles board linked!');
        break;
      case 'upload':
        this.handleToolAction('upload');
        break;
      case 'camera':
        this.openAvRecorderModal('photo');
        break;
      case 'video':
        this.openAvRecorderModal('video');
        break;
      case 'audio':
        this.openAvRecorderModal('audio');
        break;
      case 'screen':
      case 'screenrecord':
        this.openAvRecorderModal('screen');
        break;
      case 'ai-image':
      case 'aiimagesearch':
      case 'arcade':
        this.handleToolAction('ai');
        break;
      case 'ai-speech':
      case 'aitalk':
        this.openAvRecorderModal('audio');
        break;
      case 'album':
      case 'photoalbum':
        this.handleToolAction('upload');
        break;
      case 'link':
        this.handleToolAction('link');
        break;
      case 'youtube':
      case 'videosearch':
        this.openSearchModal('video');
        break;
      case 'image-search':
      case 'imagesearch':
      case 'gif':
      case 'gifsearch':
      case 'web-search':
      case 'websearch':
        this.openSearchModal('all');
        break;
      case 'draw':
        this.openDrawModal();
        break;
      case 'poll':
        this.openPollModal();
        break;
      case 'spotify':
      case 'audiosearch':
        this.composerState.attachment = {
          type: 'audio',
          provider: 'Spotify',
          title: 'Physics Podcast: Audio Reflections Episode',
          thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('Spotify track attached!');
        break;
      case 'location':
      case 'locationsearch':
        this.openLocationModal();
        break;
      default:
        this.showToast(`${toolId} selected`);
        break;
    }
  }

  /* ========================================================================
     Unified AV Studio (Photo, Video, Audio, Screen) — Padlet Parity
     ======================================================================== */

  initAvRecorderModal() {
    if (!this.avRecorderModal) return;

    if (this.avRecorderCloseBtn) {
      this.avRecorderCloseBtn.addEventListener('click', () => this.closeAvRecorderModal());
    }

    this.avRecorderModal.addEventListener('click', (e) => {
      if (e.target === this.avRecorderModal) {
        this.closeAvRecorderModal();
      }
    });

    // Mode segmented pill buttons
    if (this.avModePill) {
      this.avModePill.querySelectorAll('.av-mode-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const mode = tab.dataset.mode;
          if (mode && mode !== this.avCurrentMode) {
            this.setAvMode(mode);
          }
        });
      });
    }

    // Photo timer toggle pills
    if (this.avPhotoControls) {
      this.avPhotoControls.querySelectorAll('.av-timer-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          this.avPhotoControls.querySelectorAll('.av-timer-pill').forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          this.avPhotoTimerSeconds = parseInt(pill.dataset.timer || '0', 10);
        });
      });
    }

    // Mirror toggle
    if (this.avMirrorToggleBtn) {
      this.avMirrorToggleBtn.addEventListener('click', () => {
        this.avIsMirrored = !this.avIsMirrored;
        this.avMirrorToggleBtn.classList.toggle('is-active', this.avIsMirrored);
        if (this.avVideoPreview) {
          this.avVideoPreview.classList.toggle('is-mirrored', this.avIsMirrored);
        }
      });
    }

    // Photo shutter button
    if (this.avShutterBtn) {
      this.avShutterBtn.addEventListener('click', () => this.handlePhotoShutter());
    }

    // Video record button
    if (this.avRecordVideoBtn) {
      this.avRecordVideoBtn.addEventListener('click', () => this.toggleVideoRecording());
    }

    // Audio record button
    if (this.avRecordAudioBtn) {
      this.avRecordAudioBtn.addEventListener('click', () => this.toggleAudioRecording());
    }

    // Screen preflight start button
    if (this.avStartScreenSelectBtn) {
      this.avStartScreenSelectBtn.addEventListener('click', () => this.startScreenCapture());
    }

    // Stop screen recording button
    if (this.avStopScreenBtn) {
      this.avStopScreenBtn.addEventListener('click', () => this.stopScreenRecording());
    }

    // Permission retry button
    if (this.avPermissionRetryBtn) {
      this.avPermissionRetryBtn.addEventListener('click', () => this.setAvMode(this.avCurrentMode));
    }

    // Review stage: Retake & Save
    if (this.avRetakeBtn) {
      this.avRetakeBtn.addEventListener('click', () => this.retakeCapturedMedia());
    }

    if (this.avSaveMediaBtn) {
      this.avSaveMediaBtn.addEventListener('click', () => this.saveCapturedMedia());
    }
  }

  openAvRecorderModal(mode = 'photo') {
    this.closeAllPopovers();
    if (!this.avRecorderModal) return;

    this.avRecorderModal.hidden = false;
    this.setAvMode(mode);
  }

  closeAvRecorderModal() {
    this.stopAnyRecording(false);
    this.stopActiveMediaStreams();
    this.cleanupAudioContext();
    this.cleanupRecordingTimer();
    this.cleanupCountdown();

    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
      this.avCapturedPreviewUrl = null;
    }
    this.avCapturedBlob = null;
    this.avCapturedType = null;

    if (this.avRecorderModal) {
      this.avRecorderModal.hidden = true;
    }
  }

  async setAvMode(mode) {
    this.stopAnyRecording(false);
    this.stopActiveMediaStreams();
    this.cleanupAudioContext();
    this.cleanupRecordingTimer();
    this.cleanupCountdown();

    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
      this.avCapturedPreviewUrl = null;
    }
    this.avCapturedBlob = null;
    this.avCapturedType = null;

    this.avCurrentMode = mode;

    // Update segmented pill active state
    if (this.avModePill) {
      this.avModePill.querySelectorAll('.av-mode-tab').forEach(tab => {
        tab.classList.toggle('is-active', tab.dataset.mode === mode);
      });
    }

    // Show/hide dock controls
    if (this.avPhotoControls) this.avPhotoControls.hidden = (mode !== 'photo');
    if (this.avVideoControls) this.avVideoControls.hidden = (mode !== 'video');
    if (this.avAudioControls) this.avAudioControls.hidden = (mode !== 'audio');
    if (this.avScreenControls) this.avScreenControls.hidden = (mode !== 'screen');
    if (this.avReviewControls) this.avReviewControls.hidden = true;

    // Reset stages
    if (this.avCaptureView) this.avCaptureView.hidden = false;
    if (this.avReviewView) this.avReviewView.hidden = true;
    if (this.avReviewMediaWrap) this.avReviewMediaWrap.innerHTML = '';
    if (this.avPermissionError) this.avPermissionError.hidden = true;
    if (this.avRecordingBadge) this.avRecordingBadge.hidden = true;
    if (this.avCountdownOverlay) this.avCountdownOverlay.hidden = true;

    // Reset record buttons
    if (this.avRecordVideoBtn) this.avRecordVideoBtn.classList.remove('is-recording');
    if (this.avRecordAudioBtn) this.avRecordAudioBtn.classList.remove('is-recording');
    if (this.avStopScreenBtn) this.avStopScreenBtn.hidden = true;

    if (mode === 'photo') {
      if (this.avVideoPreview) {
        this.avVideoPreview.hidden = false;
        this.avVideoPreview.classList.toggle('is-mirrored', this.avIsMirrored);
      }
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      await this.startMediaStream({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' },
        audio: false
      });
    } else if (mode === 'video') {
      if (this.avVideoPreview) {
        this.avVideoPreview.hidden = false;
        this.avVideoPreview.classList.toggle('is-mirrored', this.avIsMirrored);
      }
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      await this.startMediaStream({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' },
        audio: true
      });
    } else if (mode === 'audio') {
      if (this.avVideoPreview) this.avVideoPreview.hidden = true;
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = false;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      await this.startMediaStream({ video: false, audio: true }, true);
    } else if (mode === 'screen') {
      if (this.avVideoPreview) this.avVideoPreview.hidden = true;
      if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = false;
    }
  }

  async startMediaStream(constraints, isAudioWaveform = false) {
    try {
      this.stopActiveMediaStreams();
      if (this.avPermissionError) this.avPermissionError.hidden = true;

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.avActiveStream = stream;

      if (!isAudioWaveform && this.avVideoPreview) {
        this.avVideoPreview.srcObject = stream;
        try {
          await this.avVideoPreview.play();
        } catch (e) {
          // Autoplay policy fallback
        }
      }

      if (isAudioWaveform) {
        this.setupAudioWaveform(stream);
      }
    } catch (err) {
      console.warn('[AVStudio] Media permission failed:', err);
      this.showPermissionError(err);
    }
  }

  stopActiveMediaStreams() {
    if (this.avActiveStream) {
      try {
        this.avActiveStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      this.avActiveStream = null;
    }
    if (this.avVideoPreview) {
      this.avVideoPreview.srcObject = null;
    }
  }

  showPermissionError(err) {
    if (!this.avPermissionError) return;
    this.avPermissionError.hidden = false;
    if (this.avVideoPreview) this.avVideoPreview.hidden = true;
    if (this.avAudioWaveform) this.avAudioWaveform.hidden = true;
    if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;

    if (this.avPermissionErrorTitle) {
      this.avPermissionErrorTitle.textContent = 'Hardware Access Required';
    }
    if (this.avPermissionErrorDesc) {
      this.avPermissionErrorDesc.textContent = err?.name === 'NotAllowedError'
        ? 'Access was denied. Please allow camera and microphone permissions in your browser address bar.'
        : `Could not connect to media device: ${err?.message || 'Check if another app is using the device.'}`;
    }
  }

  setupAudioWaveform(stream) {
    this.cleanupAudioContext();
    if (!this.avAudioWaveform) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.avAudioContext = new AudioCtx();
      const source = this.avAudioContext.createMediaStreamSource(stream);
      this.avAudioAnalyser = this.avAudioContext.createAnalyser();
      this.avAudioAnalyser.fftSize = 128;
      this.avAudioAnalyser.smoothingTimeConstant = 0.8;
      source.connect(this.avAudioAnalyser);

      const canvas = this.avAudioWaveform;
      const ctx = canvas.getContext('2d');
      const bufferLength = this.avAudioAnalyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!this.avAudioAnalyser) return;
        this.avWaveformAnimFrame = requestAnimationFrame(draw);

        const width = canvas.width = canvas.offsetWidth || 440;
        const height = canvas.height = canvas.offsetHeight || 140;

        this.avAudioAnalyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, width, height);

        // Center line
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, height / 2 - 1, width, 2);

        const barCount = 36;
        const barWidth = Math.max(3, (width / barCount) - 4);
        const step = Math.floor(bufferLength / barCount) || 1;

        for (let i = 0; i < barCount; i++) {
          const val = dataArray[i * step] || 0;
          const percent = val / 255;
          const barHeight = Math.max(4, percent * (height * 0.82));
          const x = i * (barWidth + 4) + 6;
          const y = (height - barHeight) / 2;

          // Gradient from hot pink #ff4081 to #de3163
          const grad = ctx.createLinearGradient(x, y, x, y + barHeight);
          grad.addColorStop(0, '#ff4081');
          grad.addColorStop(1, '#de3163');

          ctx.fillStyle = grad;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, barWidth, barHeight, 4);
          } else {
            ctx.rect(x, y, barWidth, barHeight);
          }
          ctx.fill();
        }
      };

      draw();
    } catch (e) {
      console.warn('[AVStudio] Audio waveform setup failed:', e);
    }
  }

  cleanupAudioContext() {
    if (this.avWaveformAnimFrame) {
      cancelAnimationFrame(this.avWaveformAnimFrame);
      this.avWaveformAnimFrame = null;
    }
    if (this.avAudioContext && this.avAudioContext.state !== 'closed') {
      try {
        this.avAudioContext.close();
      } catch (e) {}
      this.avAudioContext = null;
    }
    this.avAudioAnalyser = null;
  }

  getBestSupportedMime(kind = 'video') {
    if (typeof MediaRecorder === 'undefined') return '';
    if (kind === 'audio') {
      const audioTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus'
      ];
      return audioTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';
    }
    const videoTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4'
    ];
    return videoTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';
  }

  handlePhotoShutter() {
    if (!this.avActiveStream || !this.avVideoPreview) return;

    if (this.avPhotoTimerSeconds > 0) {
      this.startCountdown(this.avPhotoTimerSeconds, () => {
        this.snapPhoto();
      });
    } else {
      this.snapPhoto();
    }
  }

  startCountdown(seconds, callback) {
    if (!this.avCountdownOverlay || !this.avCountdownNumber) {
      callback();
      return;
    }

    this.cleanupCountdown();
    let current = seconds;
    this.avCountdownNumber.textContent = current;
    this.avCountdownOverlay.hidden = false;

    this.avCountdownInterval = setInterval(() => {
      current--;
      if (current <= 0) {
        this.cleanupCountdown();
        callback();
      } else {
        this.avCountdownNumber.textContent = current;
      }
    }, 1000);
  }

  cleanupCountdown() {
    if (this.avCountdownInterval) {
      clearInterval(this.avCountdownInterval);
      this.avCountdownInterval = null;
    }
    if (this.avCountdownOverlay) {
      this.avCountdownOverlay.hidden = true;
    }
  }

  snapPhoto() {
    if (!this.avVideoPreview) return;
    const video = this.avVideoPreview;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (this.avIsMirrored) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob((blob) => {
      if (blob) {
        this.showReviewScreen('photo', blob);
      }
    }, 'image/jpeg', 0.92);
  }

  toggleVideoRecording() {
    if (this.avMediaRecorder && this.avMediaRecorder.state === 'recording') {
      this.stopVideoRecording();
    } else {
      this.startVideoRecording();
    }
  }

  startVideoRecording() {
    if (!this.avActiveStream) return;

    const mime = this.getBestSupportedMime('video');
    this.avRecordedChunks = [];

    try {
      this.avMediaRecorder = new MediaRecorder(this.avActiveStream, mime ? { mimeType: mime } : undefined);
      this.avMediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.avRecordedChunks.push(e.data);
        }
      };
      this.avMediaRecorder.onstop = () => {
        const finalBlob = new Blob(this.avRecordedChunks, { type: mime || 'video/webm' });
        this.showReviewScreen('video', finalBlob);
      };

      this.avMediaRecorder.start(250);
      if (this.avRecordVideoBtn) this.avRecordVideoBtn.classList.add('is-recording');
      this.startRecordingTimer(15 * 60, () => this.stopVideoRecording());
    } catch (e) {
      console.error('[AVStudio] Failed to start video recording:', e);
      this.showToast('Could not start video recording');
    }
  }

  stopVideoRecording() {
    this.cleanupRecordingTimer();
    if (this.avRecordVideoBtn) this.avRecordVideoBtn.classList.remove('is-recording');
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      this.avMediaRecorder.stop();
    }
  }

  toggleAudioRecording() {
    if (this.avMediaRecorder && this.avMediaRecorder.state === 'recording') {
      this.stopAudioRecording();
    } else {
      this.startAudioRecording();
    }
  }

  startAudioRecording() {
    if (!this.avActiveStream) return;

    const mime = this.getBestSupportedMime('audio');
    this.avRecordedChunks = [];

    try {
      this.avMediaRecorder = new MediaRecorder(this.avActiveStream, mime ? { mimeType: mime } : undefined);
      this.avMediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.avRecordedChunks.push(e.data);
        }
      };
      this.avMediaRecorder.onstop = () => {
        const finalBlob = new Blob(this.avRecordedChunks, { type: mime || 'audio/webm' });
        this.showReviewScreen('audio', finalBlob);
      };

      this.avMediaRecorder.start(250);
      if (this.avRecordAudioBtn) this.avRecordAudioBtn.classList.add('is-recording');
      this.startRecordingTimer(15 * 60, () => this.stopAudioRecording());
    } catch (e) {
      console.error('[AVStudio] Failed to start audio recording:', e);
      this.showToast('Could not start audio recording');
    }
  }

  stopAudioRecording() {
    this.cleanupRecordingTimer();
    if (this.avRecordAudioBtn) this.avRecordAudioBtn.classList.remove('is-recording');
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      this.avMediaRecorder.stop();
    }
  }

  async startScreenCapture() {
    try {
      this.stopActiveMediaStreams();
      const withMic = this.avScreenMicCheckbox?.checked ?? true;

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: true
      });

      let finalStream = displayStream;

      if (withMic) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const combinedTracks = [
            ...displayStream.getVideoTracks(),
            ...displayStream.getAudioTracks(),
            ...micStream.getAudioTracks()
          ];
          finalStream = new MediaStream(combinedTracks);
        } catch (micErr) {
          console.warn('[AVStudio] Optional mic capture denied, continuing with screen only');
        }
      }

      this.avActiveStream = finalStream;

      if (this.avVideoPreview) {
        this.avVideoPreview.srcObject = finalStream;
        this.avVideoPreview.classList.remove('is-mirrored');
        this.avVideoPreview.hidden = false;
        try { await this.avVideoPreview.play(); } catch (e) {}
      }

      if (this.avScreenPreflight) this.avScreenPreflight.hidden = true;
      if (this.avStopScreenBtn) this.avStopScreenBtn.hidden = false;

      // Handle user clicking native browser "Stop sharing" bar
      const videoTrack = displayStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          this.stopScreenRecording();
        };
      }

      // Automatically begin recording screen stream
      const mime = this.getBestSupportedMime('video');
      this.avRecordedChunks = [];
      this.avMediaRecorder = new MediaRecorder(finalStream, mime ? { mimeType: mime } : undefined);
      this.avMediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.avRecordedChunks.push(e.data);
        }
      };
      this.avMediaRecorder.onstop = () => {
        const finalBlob = new Blob(this.avRecordedChunks, { type: mime || 'video/webm' });
        this.showReviewScreen('screen', finalBlob);
      };
      this.avMediaRecorder.start(250);
      this.startRecordingTimer(15 * 60, () => this.stopScreenRecording());
    } catch (err) {
      console.warn('[AVStudio] Display capture cancelled or failed:', err);
      if (this.avScreenPreflight) this.avScreenPreflight.hidden = false;
    }
  }

  stopScreenRecording() {
    this.cleanupRecordingTimer();
    if (this.avStopScreenBtn) this.avStopScreenBtn.hidden = true;
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      this.avMediaRecorder.stop();
    }
  }

  stopAnyRecording(triggerReview = true) {
    this.cleanupRecordingTimer();
    if (this.avMediaRecorder && this.avMediaRecorder.state !== 'inactive') {
      if (!triggerReview) {
        this.avMediaRecorder.ondataavailable = null;
        this.avMediaRecorder.onstop = null;
      }
      try {
        this.avMediaRecorder.stop();
      } catch (e) {}
      this.avMediaRecorder = null;
    }
  }

  startRecordingTimer(maxSeconds, onMaxReached) {
    this.cleanupRecordingTimer();
    this.avRecordingSeconds = 0;
    if (this.avRecordingBadge) this.avRecordingBadge.hidden = false;
    if (this.avRecordingTimerText) this.avRecordingTimerText.textContent = '00:00';

    this.avRecordingInterval = setInterval(() => {
      this.avRecordingSeconds++;
      const mins = String(Math.floor(this.avRecordingSeconds / 60)).padStart(2, '0');
      const secs = String(this.avRecordingSeconds % 60).padStart(2, '0');
      if (this.avRecordingTimerText) {
        this.avRecordingTimerText.textContent = `${mins}:${secs}`;
      }
      if (this.avRecordingSeconds >= maxSeconds) {
        this.cleanupRecordingTimer();
        if (onMaxReached) onMaxReached();
      }
    }, 1000);
  }

  cleanupRecordingTimer() {
    if (this.avRecordingInterval) {
      clearInterval(this.avRecordingInterval);
      this.avRecordingInterval = null;
    }
    if (this.avRecordingBadge) {
      this.avRecordingBadge.hidden = true;
    }
    this.avRecordingSeconds = 0;
  }

  showReviewScreen(type, blob) {
    this.stopActiveMediaStreams();
    this.cleanupAudioContext();
    this.cleanupRecordingTimer();
    this.cleanupCountdown();

    this.avCapturedBlob = blob;
    this.avCapturedType = type;

    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
    }
    this.avCapturedPreviewUrl = URL.createObjectURL(blob);

    if (this.avCaptureView) this.avCaptureView.hidden = true;
    if (this.avReviewView) this.avReviewView.hidden = false;

    // Hide all mode dock controls, reveal review dock controls
    if (this.avPhotoControls) this.avPhotoControls.hidden = true;
    if (this.avVideoControls) this.avVideoControls.hidden = true;
    if (this.avAudioControls) this.avAudioControls.hidden = true;
    if (this.avScreenControls) this.avScreenControls.hidden = true;
    if (this.avReviewControls) this.avReviewControls.hidden = false;

    if (this.avReviewMediaWrap) {
      this.avReviewMediaWrap.innerHTML = '';
      if (type === 'photo') {
        const img = document.createElement('img');
        img.src = this.avCapturedPreviewUrl;
        img.alt = 'Captured photo';
        this.avReviewMediaWrap.appendChild(img);
      } else if (type === 'video' || type === 'screen') {
        const video = document.createElement('video');
        video.src = this.avCapturedPreviewUrl;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        this.avReviewMediaWrap.appendChild(video);
      } else if (type === 'audio') {
        const audioWrap = document.createElement('div');
        audioWrap.className = 'av-audio-review-card';
        audioWrap.innerHTML = `
          <div class="av-audio-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" stroke-width="2"/></svg>
          </div>
          <h4>Audio Reflection Ready</h4>
          <audio src="${this.avCapturedPreviewUrl}" controls autoplay></audio>
        `;
        this.avReviewMediaWrap.appendChild(audioWrap);
      }
    }
  }

  retakeCapturedMedia() {
    if (this.avCapturedPreviewUrl) {
      URL.revokeObjectURL(this.avCapturedPreviewUrl);
      this.avCapturedPreviewUrl = null;
    }
    this.avCapturedBlob = null;
    this.setAvMode(this.avCurrentMode);
  }

  async saveCapturedMedia() {
    if (!this.avCapturedBlob) return;
    const type = this.avCapturedType;
    const blob = this.avCapturedBlob;

    if (this.avSaveMediaBtn) {
      this.avSaveMediaBtn.disabled = true;
      this.avSaveMediaBtn.textContent = 'Saving...';
    }
    this.showToast('Attaching media...');

    try {
      let ext = 'webm';
      let mediaType = 'video';
      let category = 'Video Recording';

      if (type === 'photo') {
        ext = 'jpg';
        mediaType = 'image';
        category = 'Camera Snapshot';
      } else if (type === 'audio') {
        ext = 'webm';
        mediaType = 'audio';
        category = 'Audio Reflection';
      } else if (type === 'screen') {
        ext = 'webm';
        mediaType = 'video';
        category = 'Screen Recording';
      }

      const filename = `${type}_${Date.now()}.${ext}`;
      let uploaded = null;

      if (window.padlesR2) {
        uploaded = await window.padlesR2.uploadMedia(blob, {
          type: mediaType,
          filename: filename,
          boardId: this.activeBoardId || 'board-default-physics'
        });
      } else {
        const localUrl = URL.createObjectURL(blob);
        uploaded = {
          url: localUrl,
          thumbnailUrl: mediaType === 'image' ? localUrl : '',
          storageId: 'att_' + Date.now()
        };
      }

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const attachment = {
        type: mediaType,
        category: category,
        provider: 'Padles Studio',
        title: `${category} (${timeStr})`,
        url: uploaded.url,
        storageId: uploaded.storageId,
        thumbnailUrl: uploaded.thumbnailUrl || (mediaType === 'image' ? uploaded.url : ''),
        size: blob.size,
        mimeType: blob.type || (mediaType === 'image' ? 'image/jpeg' : (mediaType === 'audio' ? 'audio/webm' : 'video/webm'))
      };

      if (!this.activeDraftId && !this.editingCardId) {
        this.openComposer(this.state.sections[0]?.id);
      }

      this.composerState.attachment = attachment;
      if (this.activeDraftId) {
        const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
        if (draft) draft.attachment = attachment;
      }
      if (this.editingCardId) {
        const card = this.findCardById(this.editingCardId);
        if (card) {
          card.attachment = attachment;
          card.type = mediaType;
        }
      }

      this.updateAttachmentPreviewUI();
      this.syncActiveDraftFromInputs();
      this.saveState();
      this.closeAvRecorderModal();
      this.showToast(`${category} attached!`);
    } catch (err) {
      console.error('[AVStudio] Failed to save media:', err);
      this.showToast('Failed to save media: ' + (err.message || 'Unknown error'));
    } finally {
      if (this.avSaveMediaBtn) {
        this.avSaveMediaBtn.disabled = false;
        this.avSaveMediaBtn.textContent = 'Save & Attach';
      }
    }
  }

  /* ========================================================================
     Drawing Whiteboard Modal (Padlet Parity)
     ======================================================================== */

  initDrawModal() {
    if (!this.drawModal) return;

    if (this.drawModalCloseBtn) {
      this.drawModalCloseBtn.addEventListener('click', () => this.closeDrawModal());
    }

    this.drawModal.addEventListener('click', (e) => {
      if (e.target === this.drawModal) {
        this.closeDrawModal();
      }
    });

    // Tool selector: Pen, Highlighter, Eraser
    if (this.drawToolbar) {
      this.drawToolbar.querySelectorAll('.draw-tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.drawToolbar.querySelectorAll('.draw-tool-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.drawCurrentTool = btn.dataset.tool || 'pen';
        });
      });

      // Stroke size selector
      this.drawToolbar.querySelectorAll('.draw-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.drawToolbar.querySelectorAll('.draw-size-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.drawStrokeSize = parseInt(btn.dataset.size || '3', 10);
        });
      });

      // Swatches
      this.drawToolbar.querySelectorAll('.draw-color-swatch').forEach(btn => {
        btn.addEventListener('click', () => {
          this.drawToolbar.querySelectorAll('.draw-color-swatch').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.drawStrokeColor = btn.dataset.color || '#000000';
          if (this.drawCurrentTool === 'eraser') {
            const penBtn = this.drawToolbar.querySelector('.draw-tool-btn[data-tool="pen"]');
            if (penBtn) penBtn.click();
          }
        });
      });
    }

    // Action buttons
    if (this.drawUndoBtn) this.drawUndoBtn.addEventListener('click', () => this.undoDraw());
    if (this.drawRedoBtn) this.drawRedoBtn.addEventListener('click', () => this.redoDraw());
    if (this.drawClearBtn) this.drawClearBtn.addEventListener('click', () => this.clearDrawCanvas());
    if (this.drawBgToggleBtn) this.drawBgToggleBtn.addEventListener('click', () => this.toggleDrawBackground());
    if (this.drawSaveBtn) this.drawSaveBtn.addEventListener('click', () => this.saveDrawMedia());

    // Canvas drawing interaction via Pointer Events
    if (this.drawCanvas) {
      this.drawCanvas.addEventListener('pointerdown', (e) => this.handleDrawPointerDown(e));
      this.drawCanvas.addEventListener('pointermove', (e) => this.handleDrawPointerMove(e));
      this.drawCanvas.addEventListener('pointerup', () => this.handleDrawPointerUp());
      this.drawCanvas.addEventListener('pointercancel', () => this.handleDrawPointerUp());
    }

    // Window resize observer for canvas
    window.addEventListener('resize', () => {
      if (this.drawModal && !this.drawModal.hidden) {
        this.resizeDrawCanvas(false);
      }
    });
  }

  openDrawModal() {
    this.closeAllPopovers();
    if (!this.drawModal) return;

    this.drawModal.hidden = false;
    setTimeout(() => {
      this.resizeDrawCanvas(true);
    }, 50);
  }

  closeDrawModal() {
    if (this.drawModal) {
      this.drawModal.hidden = true;
    }
  }

  resizeDrawCanvas(isInit = false) {
    if (!this.drawCanvas || !this.drawStageContainer) return;

    const width = this.drawStageContainer.clientWidth || 800;
    const height = this.drawStageContainer.clientHeight || 540;

    let previousData = null;
    if (!isInit && this.drawCanvas.width > 0 && this.drawCanvas.height > 0) {
      try {
        const ctx = this.drawCanvas.getContext('2d');
        previousData = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      } catch (e) {}
    }

    this.drawCanvas.width = width;
    this.drawCanvas.height = height;

    const ctx = this.drawCanvas.getContext('2d');
    if (previousData) {
      ctx.putImageData(previousData, 0, 0);
    } else if (isInit) {
      this.clearDrawCanvas(true);
      this.drawUndoStack = [];
      this.drawRedoStack = [];
      this.updateDrawUndoRedoButtons();
    }
  }

  pushDrawUndoState() {
    if (!this.drawCanvas) return;
    try {
      const ctx = this.drawCanvas.getContext('2d');
      const data = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      this.drawUndoStack.push(data);
      if (this.drawUndoStack.length > 30) this.drawUndoStack.shift();
      this.drawRedoStack = [];
      this.updateDrawUndoRedoButtons();
    } catch (e) {}
  }

  undoDraw() {
    if (this.drawUndoStack.length === 0 || !this.drawCanvas) return;
    const ctx = this.drawCanvas.getContext('2d');
    const current = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    this.drawRedoStack.push(current);

    const prev = this.drawUndoStack.pop();
    ctx.putImageData(prev, 0, 0);
    this.updateDrawUndoRedoButtons();
  }

  redoDraw() {
    if (this.drawRedoStack.length === 0 || !this.drawCanvas) return;
    const ctx = this.drawCanvas.getContext('2d');
    const current = ctx.getImageData(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    this.drawUndoStack.push(current);

    const next = this.drawRedoStack.pop();
    ctx.putImageData(next, 0, 0);
    this.updateDrawUndoRedoButtons();
  }

  updateDrawUndoRedoButtons() {
    if (this.drawUndoBtn) this.drawUndoBtn.disabled = this.drawUndoStack.length === 0;
    if (this.drawRedoBtn) this.drawRedoBtn.disabled = this.drawRedoStack.length === 0;
  }

  clearDrawCanvas(skipPush = false) {
    if (!this.drawCanvas) return;
    if (!skipPush) this.pushDrawUndoState();
    const ctx = this.drawCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    if (!skipPush) this.updateDrawUndoRedoButtons();
  }

  toggleDrawBackground() {
    this.drawIsDarkBg = !this.drawIsDarkBg;
    if (this.drawStageContainer) {
      this.drawStageContainer.classList.toggle('is-dark-bg', this.drawIsDarkBg);
    }
  }

  handleDrawPointerDown(e) {
    if (!this.drawCanvas) return;
    this.drawCanvas.setPointerCapture(e.pointerId);
    const rect = this.drawCanvas.getBoundingClientRect();
    this.drawLastX = e.clientX - rect.left;
    this.drawLastY = e.clientY - rect.top;
    this.isDrawing = true;
    this.pushDrawUndoState();

    const ctx = this.drawCanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.drawLastX, this.drawLastY, this.drawStrokeSize / 2, 0, Math.PI * 2);
    if (this.drawCurrentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = this.drawCurrentTool === 'highlighter' ? this.hexToRgba(this.drawStrokeColor, 0.4) : this.drawStrokeColor;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(this.drawLastX, this.drawLastY);
  }

  handleDrawPointerMove(e) {
    if (!this.isDrawing || !this.drawCanvas) return;
    const rect = this.drawCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = this.drawCanvas.getContext('2d');

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (this.drawCurrentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = this.drawStrokeSize * 2.8;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else if (this.drawCurrentTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = this.drawStrokeSize * 2.5;
      ctx.strokeStyle = this.hexToRgba(this.drawStrokeColor, 0.35);
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = this.drawStrokeSize;
      ctx.strokeStyle = this.drawStrokeColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    this.drawLastX = x;
    this.drawLastY = y;
  }

  handleDrawPointerUp() {
    this.isDrawing = false;
    if (this.drawCanvas) {
      const ctx = this.drawCanvas.getContext('2d');
      ctx.beginPath();
    }
  }

  hexToRgba(hex, alpha = 1) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  async saveDrawMedia() {
    if (!this.drawCanvas) return;

    if (this.drawSaveBtn) {
      this.drawSaveBtn.disabled = true;
      this.drawSaveBtn.textContent = 'Saving...';
    }
    this.showToast('Saving drawing...');

    try {
      // Create offscreen canvas with solid background (white or dark)
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = this.drawCanvas.width;
      exportCanvas.height = this.drawCanvas.height;
      const ctx = exportCanvas.getContext('2d');

      ctx.fillStyle = this.drawIsDarkBg ? '#1e2022' : '#ffffff';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      ctx.drawImage(this.drawCanvas, 0, 0);

      const blob = await new Promise(resolve => exportCanvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('Could not export canvas to blob');

      const filename = `drawing_${Date.now()}.png`;
      let uploaded = null;

      if (window.padlesR2) {
        uploaded = await window.padlesR2.uploadMedia(blob, {
          type: 'drawing',
          filename: filename,
          boardId: this.activeBoardId || 'board-default-physics'
        });
      } else {
        const localUrl = URL.createObjectURL(blob);
        uploaded = {
          url: localUrl,
          thumbnailUrl: localUrl,
          storageId: 'att_' + Date.now()
        };
      }

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const attachment = {
        type: 'drawing',
        category: 'Drawing',
        provider: 'Padles Whiteboard',
        title: `Whiteboard Sketch (${timeStr})`,
        url: uploaded.url,
        storageId: uploaded.storageId,
        thumbnailUrl: uploaded.thumbnailUrl || uploaded.url,
        size: blob.size,
        mimeType: 'image/png'
      };

      if (!this.activeDraftId && !this.editingCardId) {
        this.openComposer(this.state.sections[0]?.id);
      }

      this.composerState.attachment = attachment;
      if (this.activeDraftId) {
        const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
        if (draft) draft.attachment = attachment;
      }
      if (this.editingCardId) {
        const card = this.findCardById(this.editingCardId);
        if (card) {
          card.attachment = attachment;
          card.type = 'drawing';
        }
      }

      this.updateAttachmentPreviewUI();
      this.syncActiveDraftFromInputs();
      this.saveState();
      this.closeDrawModal();
      this.showToast('Drawing attached!');
    } catch (err) {
      console.error('[Draw] Save failed:', err);
      this.showToast('Failed to save drawing');
    } finally {
      if (this.drawSaveBtn) {
        this.drawSaveBtn.disabled = false;
        this.drawSaveBtn.textContent = 'Save & Attach';
      }
    }
  }

  /* ========================================================================
     Interactive Poll Modal (Padlet Parity)
     ======================================================================== */

  initPollModal() {
    if (!this.pollModal) return;

    if (this.pollModalCloseBtn) {
      this.pollModalCloseBtn.addEventListener('click', () => this.closePollModal());
    }

    this.pollModal.addEventListener('click', (e) => {
      if (e.target === this.pollModal) {
        this.closePollModal();
      }
    });

    if (this.pollAddOptionBtn) {
      this.pollAddOptionBtn.addEventListener('click', () => this.appendPollOptionRow());
    }

    if (this.pollSaveBtn) {
      this.pollSaveBtn.addEventListener('click', () => this.savePollModal());
    }
  }

  openPollModal() {
    this.closeAllPopovers();
    if (!this.pollModal) return;

    if (this.pollQuestionInput) this.pollQuestionInput.value = '';
    if (this.pollMultipleChoiceToggle) this.pollMultipleChoiceToggle.checked = false;
    if (this.pollOptionsList) {
      this.pollOptionsList.innerHTML = '';
      this.appendPollOptionRow('Yes');
      this.appendPollOptionRow('No');
    }

    this.pollModal.hidden = false;
    setTimeout(() => this.pollQuestionInput?.focus(), 50);
  }

  closePollModal() {
    if (this.pollModal) {
      this.pollModal.hidden = true;
    }
  }

  appendPollOptionRow(initialText = '') {
    if (!this.pollOptionsList) return;
    const count = this.pollOptionsList.querySelectorAll('.poll-option-row').length + 1;
    if (count > 10) {
      this.showToast('Maximum 10 poll options allowed');
      return;
    }

    const row = document.createElement('div');
    row.className = 'poll-option-row';
    row.innerHTML = `
      <input type="text" class="poll-input" placeholder="Option ${count}" value="${this.escapeHtml(initialText)}" maxlength="100" />
      <button type="button" class="poll-option-remove-btn" title="Remove option">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    const rmBtn = row.querySelector('.poll-option-remove-btn');
    rmBtn.addEventListener('click', () => {
      if (this.pollOptionsList.querySelectorAll('.poll-option-row').length <= 2) {
        this.showToast('Polls require at least 2 options');
        return;
      }
      row.remove();
    });

    this.pollOptionsList.appendChild(row);
  }

  savePollModal() {
    const question = (this.pollQuestionInput?.value || '').trim();
    if (!question) {
      this.showToast('Please enter a poll question');
      this.pollQuestionInput?.focus();
      return;
    }

    const optionInputs = this.pollOptionsList?.querySelectorAll('input.poll-input') || [];
    const validOptions = [];
    optionInputs.forEach(inp => {
      const val = inp.value.trim();
      if (val) validOptions.push(val);
    });

    if (validOptions.length < 2) {
      this.showToast('Please provide at least 2 options for your poll');
      return;
    }

    const options = validOptions.map((text, idx) => ({
      id: `opt_${Date.now()}_${idx}`,
      text: text,
      votes: 0
    }));

    const allowMultiple = this.pollMultipleChoiceToggle?.checked ?? false;

    const attachment = {
      type: 'poll',
      provider: 'Padles Poll',
      category: 'Poll',
      title: question,
      question: question,
      allowMultiple: allowMultiple,
      totalVotes: 0,
      options: options
    };

    if (!this.activeDraftId && !this.editingCardId) {
      this.openComposer(this.state.sections[0]?.id);
    }

    this.composerState.attachment = attachment;
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) draft.attachment = attachment;
    }
    if (this.editingCardId) {
      const card = this.findCardById(this.editingCardId);
      if (card) {
        card.attachment = attachment;
        card.type = 'poll';
      }
    }

    this.updateAttachmentPreviewUI();
    this.syncActiveDraftFromInputs();
    this.saveState();
    this.closePollModal();
    this.showToast('Poll created and attached!');
  }

  voteOnPoll(cardId, optionId) {
    const card = this.findCardById(cardId);
    if (!card || !card.attachment || card.attachment.type !== 'poll') return;

    const poll = card.attachment;
    const storageKey = `padles_voted_${cardId}`;
    let votedList = [];
    try {
      votedList = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      votedList = [];
    }

    if (!poll.allowMultiple) {
      if (votedList.includes(optionId)) {
        // Toggle off vote
        votedList = [];
        const opt = poll.options.find(o => o.id === optionId);
        if (opt && opt.votes > 0) opt.votes--;
      } else {
        // Remove previous vote if any
        votedList.forEach(prevId => {
          const prev = poll.options.find(o => o.id === prevId);
          if (prev && prev.votes > 0) prev.votes--;
        });
        votedList = [optionId];
        const opt = poll.options.find(o => o.id === optionId);
        if (opt) opt.votes = (opt.votes || 0) + 1;
      }
    } else {
      if (votedList.includes(optionId)) {
        votedList = votedList.filter(id => id !== optionId);
        const opt = poll.options.find(o => o.id === optionId);
        if (opt && opt.votes > 0) opt.votes--;
      } else {
        votedList.push(optionId);
        const opt = poll.options.find(o => o.id === optionId);
        if (opt) opt.votes = (opt.votes || 0) + 1;
      }
    }

    poll.totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);
    localStorage.setItem(storageKey, JSON.stringify(votedList));
    this.saveState();
    this.renderBoard();

    if (this.activeDetailCardId === cardId) {
      this.openCardDetailModal(cardId);
    }
  }

  /* ========================================================================
     Location Map Picker Modal (Padlet Parity)
     ======================================================================== */

  initLocationModal() {
    if (!this.locationModal) return;

    if (this.locationModalCloseBtn) {
      this.locationModalCloseBtn.addEventListener('click', () => this.closeLocationModal());
    }

    this.locationModal.addEventListener('click', (e) => {
      if (e.target === this.locationModal) {
        this.closeLocationModal();
      }
    });

    if (this.locationSearchInput) {
      this.locationSearchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        clearTimeout(this.locationSearchTimeout);
        this.locationSearchTimeout = setTimeout(() => {
          this.handleLocationSearch(q);
        }, 400);
      });

      this.locationSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const firstResult = this.locationResultsDropdown?.querySelector('.location-result-item');
          if (firstResult) firstResult.click();
        }
      });
    }

    if (this.locationSaveBtn) {
      this.locationSaveBtn.addEventListener('click', () => this.saveLocationMedia());
    }
  }

  openLocationModal() {
    this.closeAllPopovers();
    if (!this.locationModal) return;

    if (this.locationSearchInput) this.locationSearchInput.value = '';
    if (this.locationResultsDropdown) {
      this.locationResultsDropdown.innerHTML = '';
      this.locationResultsDropdown.hidden = true;
    }

    // Default to MIT, Cambridge MA (Physics Audio Reflections)
    this.setLocation({
      title: 'Massachusetts Institute of Technology, Cambridge, MA',
      lat: 42.3601,
      lon: -71.0942
    });

    this.locationModal.hidden = false;
    setTimeout(() => this.locationSearchInput?.focus(), 50);
  }

  closeLocationModal() {
    if (this.locationModal) {
      this.locationModal.hidden = true;
    }
  }

  async handleLocationSearch(query) {
    if (!query || query.length < 3) {
      if (this.locationResultsDropdown) this.locationResultsDropdown.hidden = true;
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const items = await res.json();

      if (!this.locationResultsDropdown) return;
      this.locationResultsDropdown.innerHTML = '';

      if (!items || items.length === 0) {
        this.locationResultsDropdown.innerHTML = '<div style="padding:12px;color:#6b7280;font-size:13px;text-align:center;">No locations found</div>';
        this.locationResultsDropdown.hidden = false;
        return;
      }

      items.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'location-result-item';
        btn.textContent = item.display_name;
        btn.addEventListener('click', () => {
          this.setLocation({
            title: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon)
          });
          this.locationResultsDropdown.hidden = true;
          if (this.locationSearchInput) this.locationSearchInput.value = item.display_name;
        });
        this.locationResultsDropdown.appendChild(btn);
      });

      this.locationResultsDropdown.hidden = false;
    } catch (err) {
      console.warn('[Location] Geocoding request failed:', err);
    }
  }

  setLocation(loc) {
    this.selectedLocation = loc;
    if (this.locationPinLabel) {
      this.locationPinLabel.textContent = loc.title;
    }
    if (this.locationMapFrame) {
      const delta = 0.008;
      const bbox = `${loc.lon - delta}%2C${loc.lat - delta}%2C${loc.lon + delta}%2C${loc.lat + delta}`;
      this.locationMapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`;
    }
    if (this.locationSaveBtn) {
      this.locationSaveBtn.disabled = false;
    }
  }

  saveLocationMedia() {
    if (!this.selectedLocation) return;
    const loc = this.selectedLocation;

    const delta = 0.008;
    const bbox = `${loc.lon - delta}%2C${loc.lat - delta}%2C${loc.lon + delta}%2C${loc.lat + delta}`;
    const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`;
    const mapUrl = `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lon}#map=16/${loc.lat}/${loc.lon}`;

    const attachment = {
      type: 'location',
      provider: 'OpenStreetMap',
      category: 'Location',
      title: loc.title,
      latitude: loc.lat,
      longitude: loc.lon,
      mapUrl: mapUrl,
      embedUrl: embedUrl
    };

    if (!this.activeDraftId && !this.editingCardId) {
      this.openComposer(this.state.sections[0]?.id);
    }

    this.composerState.attachment = attachment;
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) draft.attachment = attachment;
    }
    if (this.editingCardId) {
      const card = this.findCardById(this.editingCardId);
      if (card) {
        card.attachment = attachment;
        card.type = 'location';
      }
    }

    this.updateAttachmentPreviewUI();
    this.syncActiveDraftFromInputs();
    this.saveState();
    this.closeLocationModal();
    this.showToast('Location attached!');
  }

  /* ========================================================================
     Custom Field Schema Builder (Blueprint Section 6.2)
     ======================================================================== */

  initCustomFieldBuilder() {
    if (!this.customFieldBuilderModal) return;

    if (this.backCustomFieldBtn) {
      this.backCustomFieldBtn.addEventListener('click', () => {
        this.closeCustomFieldBuilder();
        this.openPostFieldsModal();
      });
    }

    if (this.closeCustomFieldModalBtn) {
      this.closeCustomFieldModalBtn.addEventListener('click', () => this.closeCustomFieldBuilder());
    }

    if (this.cancelCustomFieldBtn) {
      this.cancelCustomFieldBtn.addEventListener('click', () => this.closeCustomFieldBuilder());
    }

    if (this.customFieldTypeSelect) {
      this.customFieldTypeSelect.addEventListener('change', () => this.renderCustomFieldTypeOptions());
    }

    if (this.saveCustomFieldBtn) {
      this.saveCustomFieldBtn.addEventListener('click', () => this.saveCustomField());
    }

    this.customFieldBuilderModal.addEventListener('click', (e) => {
      if (e.target === this.customFieldBuilderModal) {
        this.closeCustomFieldBuilder();
      }
    });

    this.renderCustomFieldsList();
  }

  openCustomFieldBuilder() {
    if (this.postFieldsModal) this.postFieldsModal.hidden = true;
    if (!this.customFieldBuilderModal) return;

    if (this.customFieldNameInput) this.customFieldNameInput.value = '';
    if (this.customFieldTypeSelect) this.customFieldTypeSelect.value = 'rating';
    if (this.customFieldRequiredToggle) this.customFieldRequiredToggle.checked = false;

    this.renderCustomFieldTypeOptions();
    this.customFieldBuilderModal.hidden = false;
    setTimeout(() => this.customFieldNameInput?.focus(), 50);
  }

  closeCustomFieldBuilder() {
    if (this.customFieldBuilderModal) {
      this.customFieldBuilderModal.hidden = true;
    }
  }

  renderCustomFieldTypeOptions() {
    if (!this.customFieldTypeOptions || !this.customFieldTypeSelect) return;
    const type = this.customFieldTypeSelect.value;
    let html = '';

    switch (type) {
      case 'rating':
        html = `
          <label class="builder-label">Maximum rating stars</label>
          <select id="cfOptMaxRating" class="builder-select">
            <option value="5" selected>5 Stars (★★★★★)</option>
            <option value="10">10 Stars</option>
          </select>
        `;
        break;
      case 'score':
        html = `
          <label class="builder-label">Maximum score scale</label>
          <input type="number" id="cfOptMaxScore" class="builder-input" value="100" min="10" max="1000" />
        `;
        break;
      case 'vote':
        html = `
          <label class="builder-label">Vote configuration</label>
          <select id="cfOptVoteType" class="builder-select">
            <option value="updown" selected>Upvote / downvote</option>
            <option value="uponly">Upvote only</option>
          </select>
        `;
        break;
      case 'select':
        html = `
          <label class="builder-label">Options (comma-separated)</label>
          <input type="text" id="cfOptChoices" class="builder-input" placeholder="Draft, Review, Final" value="Active, In Progress, Completed" />
        `;
        break;
      case 'date':
        html = `
          <label class="builder-label">Display formatting</label>
          <select id="cfOptDateFormat" class="builder-select">
            <option value="friendly" selected>Friendly (Oct 12, 2026)</option>
            <option value="standard">MM/DD/YYYY</option>
            <option value="iso">ISO (YYYY-MM-DD)</option>
          </select>
        `;
        break;
      default:
        html = `<div style="font-size: 12px; color: rgba(255,255,255,0.5);">Standard ${type} field with validation</div>`;
        break;
    }

    this.customFieldTypeOptions.innerHTML = html;
  }

  saveCustomField() {
    const name = this.customFieldNameInput ? this.customFieldNameInput.value.trim() : '';
    if (!name) {
      alert('Please enter a field name.');
      return;
    }

    const type = this.customFieldTypeSelect ? this.customFieldTypeSelect.value : 'text';
    const required = this.customFieldRequiredToggle ? this.customFieldRequiredToggle.checked : false;
    const options = {};

    if (type === 'rating') {
      const el = document.getElementById('cfOptMaxRating');
      options.maxRating = el ? parseInt(el.value, 10) : 5;
    } else if (type === 'score') {
      const el = document.getElementById('cfOptMaxScore');
      options.maxScore = el ? parseInt(el.value, 10) : 100;
    } else if (type === 'select') {
      const el = document.getElementById('cfOptChoices');
      options.choices = el ? el.value.split(',').map(s => s.trim()).filter(Boolean) : [];
    }

    const newField = {
      id: 'cf-' + Date.now(),
      name,
      type,
      required,
      options
    };

    if (!this.state.customFields) this.state.customFields = [];
    this.state.customFields.push(newField);
    this.saveState();

    this.closeCustomFieldBuilder();
    this.openPostFieldsModal();
    this.renderCustomFieldsList();
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) this.renderComposerCustomFields(draft);
    }
    this.showToast(`Custom field "${name}" created!`);
  }

  deleteCustomField(fieldId) {
    this.state.customFields = (this.state.customFields || []).filter(f => f.id !== fieldId);
    this.saveState();
    this.renderCustomFieldsList();
    if (this.activeDraftId) {
      const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
      if (draft) this.renderComposerCustomFields(draft);
    }
    this.renderBoard();
    this.showToast('Custom field removed');
  }

  renderCustomFieldsList() {
    if (!this.customFieldsList) return;
    this.customFieldsList.innerHTML = '';
    const fields = this.state.customFields || [];

    if (fields.length === 0) {
      this.customFieldsList.innerHTML = '<div style="font-size: 13px; color: rgba(255,255,255,0.4); padding: 4px 0 8px 4px;">No custom fields created yet.</div>';
      return;
    }

    fields.forEach(f => {
      const row = document.createElement('div');
      row.className = 'field-item-row custom-field-row';
      row.innerHTML = `
        <div class="custom-field-row-left">
          <span class="field-label">${this.escapeHtml(f.name)}</span>
          <span class="custom-field-type-badge">${this.escapeHtml(f.type)}</span>
        </div>
        <button type="button" class="custom-field-del-btn" title="Delete custom field">&times;</button>
      `;

      row.querySelector('.custom-field-del-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteCustomField(f.id);
      });

      this.customFieldsList.appendChild(row);
    });
  }

  renderComposerCustomFields(draft) {
    if (!this.composerCustomFieldsArea) return;
    this.composerCustomFieldsArea.innerHTML = '';
    const fields = this.state.customFields || [];
    if (fields.length === 0) return;

    const values = draft?.customFieldValues || {};

    fields.forEach(f => {
      const row = document.createElement('div');
      row.className = 'composer-cf-row';
      const curVal = values[f.id] !== undefined ? values[f.id] : '';

      let inputHtml = '';
      if (f.type === 'select') {
        const choices = f.options?.choices || ['Option 1', 'Option 2'];
        inputHtml = `
          <select class="composer-cf-input" data-cf-id="${f.id}">
            <option value="">-- Select ${this.escapeHtml(f.name)} --</option>
            ${choices.map(c => `<option value="${this.escapeHtml(c)}" ${curVal === c ? 'selected' : ''}>${this.escapeHtml(c)}</option>`).join('')}
          </select>
        `;
      } else if (f.type === 'rating') {
        const max = f.options?.maxRating || 5;
        inputHtml = `
          <select class="composer-cf-input" data-cf-id="${f.id}">
            <option value="">-- Rate (Stars) --</option>
            ${Array.from({ length: max }, (_, i) => i + 1).map(n => `<option value="${n}" ${String(curVal) === String(n) ? 'selected' : ''}>${'★'.repeat(n)} (${n}/${max})</option>`).join('')}
          </select>
        `;
      } else if (f.type === 'date') {
        inputHtml = `<input type="date" class="composer-cf-input" data-cf-id="${f.id}" value="${this.escapeHtml(curVal)}" />`;
      } else if (f.type === 'score' || f.type === 'number') {
        inputHtml = `<input type="number" class="composer-cf-input" data-cf-id="${f.id}" value="${this.escapeHtml(curVal)}" placeholder="Enter ${this.escapeHtml(f.name)}..." />`;
      } else {
        inputHtml = `<input type="text" class="composer-cf-input" data-cf-id="${f.id}" value="${this.escapeHtml(curVal)}" placeholder="Enter ${this.escapeHtml(f.name)}..." />`;
      }

      row.innerHTML = `
        <label class="composer-cf-label">${this.escapeHtml(f.name)}${f.required ? ' *' : ''}</label>
        ${inputHtml}
      `;

      row.querySelector('[data-cf-id]').addEventListener('input', () => {
        this.syncActiveDraftFromInputs();
      });

      this.composerCustomFieldsArea.appendChild(row);
    });
  }

  updateAttachmentPreviewUI() {
    const att = this.composerState.attachment;
    if (att) {
      const isVideo = att.provider === 'YouTube' || att.category === 'YouTube' || att.type === 'video';
      const hasThumb = !!att.thumbnailUrl;

      let frameHtml = '';
      if (hasThumb) {
        frameHtml = `
          <div class="composer-attachment-media-frame">
            <img src="${this.escapeHtml(att.thumbnailUrl)}" class="composer-attachment-media-thumb" alt="${this.escapeHtml(att.title || att.caption || 'Attachment')}" />
            ${isVideo ? `
              <div class="composer-media-play-btn">
                <svg viewBox="0 0 32 32" height="20" width="20" fill="currentColor"><path d="M7 23.54V8.46c0-2.017 2.152-3.304 3.929-2.349l14.033 7.54c1.873 1.006 1.873 3.692 0 4.698l-14.033 7.54C9.152 26.844 7 25.557 7 23.54"/></svg>
              </div>
              <div class="composer-media-category-badge">${this.escapeHtml(att.provider || att.category || 'YouTube')}</div>
            ` : ''}
            <button type="button" class="remove-attachment-btn" id="removeAttachmentBtn" title="Remove attachment" aria-label="Remove attachment">&times;</button>
          </div>
        `;
      }

      const metaHtml = `
        <div class="attachment-preview-badge">
          <span id="previewTypeBadge">${this.escapeHtml(att.provider || att.category || att.type || 'Media')}</span>
          <span id="previewTitleText">${this.escapeHtml(att.title || att.caption || 'Attachment attached')}</span>
          ${!hasThumb ? `<button type="button" class="remove-attachment-btn" id="removeAttachmentBtn" title="Remove attachment" aria-label="Remove attachment">&times;</button>` : ''}
        </div>
      `;

      if (this.activeAttachmentPreview) {
        this.activeAttachmentPreview.innerHTML = frameHtml + metaHtml;
        this.activeAttachmentPreview.hidden = false;
        this.activeAttachmentPreview.style.display = 'flex';

        // Rebind remove button click
        const rmBtn = this.activeAttachmentPreview.querySelector('#removeAttachmentBtn');
        if (rmBtn) {
          rmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.composerState.attachment = null;
            if (this.activeDraftId) {
              const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
              if (draft) draft.attachment = null;
            }
            if (this.editingCardId) {
              const card = this.findCardById(this.editingCardId);
              if (card) {
                card.attachment = null;
                card.type = 'text';
              }
            }
            this.updateAttachmentPreviewUI();
            this.syncActiveDraftFromInputs();
            this.saveState();
          });
        }
      }
    } else {
      if (this.activeAttachmentPreview) {
        this.activeAttachmentPreview.innerHTML = '';
        this.activeAttachmentPreview.hidden = true;
        this.activeAttachmentPreview.style.display = 'none';
      }
    }
    this.updatePublishButtonState();
  }

  publishPost() {
    this.publishActiveDraft();
  }

  /* ========================================================================
     Attachment Multi-Tool Toolbar & Hover Interactions
     ======================================================================== */

  initAttachmentToolbar() {
    const cols = document.querySelectorAll('.tool-strip-col');
    const promptTick = document.getElementById('promptBarTick');
    const promptText = document.getElementById('promptBarText');
    const promptShortcut = document.getElementById('promptBarShortcut');

    cols.forEach(col => {
      col.addEventListener('mouseenter', () => {
        const title = col.dataset.title || '';
        const desc = col.dataset.desc || '';
        const shortcut = col.dataset.shortcut || '';

        const TOOL_TEXT_COLORS = {
          upload: '#e11d48',
          camera: '#0284c7',
          ai: '#7c3aed',
          link: '#059669',
          search: '#d97706',
          all: '#4f46e5'
        };
        const activeColor = TOOL_TEXT_COLORS[col.dataset.tool] || '#7c3aed';

        if (promptTick) promptTick.classList.add('is-visible');
        if (promptText) {
          promptText.innerHTML = `<strong style="color: ${activeColor}; font-weight: 700;">${this.escapeHtml(title)}</strong> <span style="color: rgba(255, 255, 255, 0.65); margin-left: 4px;">${this.escapeHtml(desc)}</span>`;
        }
        if (promptShortcut) {
          promptShortcut.textContent = shortcut;
        }
      });

      col.addEventListener('mouseleave', () => {
        if (promptTick) promptTick.classList.remove('is-visible');
        if (promptText) {
          promptText.innerHTML = 'Add an image, video, audio, link, or file.';
        }
        if (promptShortcut) {
          promptShortcut.textContent = '';
        }
      });

      col.addEventListener('click', (e) => {
        e.preventDefault();
        const tool = col.dataset.tool;
        this.handleToolAction(tool);
      });
    });

    // Keyboard Shortcuts: Ctrl+1 through Ctrl+6
    window.addEventListener('keydown', (e) => {
      if (this.activeDraftId && (e.ctrlKey || e.metaKey)) {
        if (e.key === '1') { e.preventDefault(); this.handleToolAction('upload'); }
        else if (e.key === '2') { e.preventDefault(); this.handleToolAction('camera'); }
        else if (e.key === '3') { e.preventDefault(); this.handleToolAction('ai'); }
        else if (e.key === '4') { e.preventDefault(); this.handleToolAction('link'); }
        else if (e.key === '5') { e.preventDefault(); this.handleToolAction('search'); }
        else if (e.key === '6') { e.preventDefault(); this.handleToolAction('all'); }
      }
    });
  }

  handleToolAction(tool) {
    if (tool === 'upload') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const isImg = file.type.startsWith('image/');
          const isVideo = file.type.startsWith('video/');
          const isAudio = file.type.startsWith('audio/');
          const mediaType = isImg ? 'image' : (isVideo ? 'video' : (isAudio ? 'audio' : 'file'));

          this.showToast(`Attaching ${file.name}...`);
          try {
            let uploaded = null;
            if (window.padlesR2) {
              uploaded = await window.padlesR2.uploadMedia(file, {
                type: mediaType,
                filename: file.name,
                boardId: this.activeBoardId || 'board-default-physics'
              });
            } else {
              const localUrl = URL.createObjectURL(file);
              uploaded = { url: localUrl, thumbnailUrl: isImg ? localUrl : '', storageId: 'att_' + Date.now() };
            }

            this.composerState.attachment = {
              type: mediaType,
              category: 'upload',
              provider: 'Upload',
              title: file.name,
              thumbnailUrl: uploaded.thumbnailUrl || (isImg ? uploaded.url : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'),
              url: uploaded.url,
              storageId: uploaded.storageId,
              size: file.size,
              mimeType: file.type
            };
            this.updateAttachmentPreviewUI();
            this.showToast(`Attached ${file.name}`);
          } catch (err) {
            console.error('File attach failed:', err);
            this.showToast('Failed to attach file');
          }
        }
      };
      input.click();
    } else if (tool === 'camera') {
      this.openAvRecorderModal('photo');
    } else if (tool === 'ai') {
      const promptText = prompt('Describe what you want AI to draw:', 'Quantum particles colliding in space');
      if (promptText) {
        this.composerState.attachment = {
          type: 'image',
          provider: 'AI Generated',
          title: promptText,
          domain: 'padles.ai',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
          url: '#'
        };
        this.updateAttachmentPreviewUI();
        this.showToast('AI artwork created & attached!');
      }
    } else if (tool === 'link') {
      const url = prompt('Enter website URL:', 'https://');
      if (url && url.length > 8) {
        try {
          const domain = new URL(url).hostname;
          this.composerState.attachment = {
            type: 'link',
            provider: domain,
            domain: domain,
            title: url,
            thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
            url: url
          };
          this.updateAttachmentPreviewUI();
          this.showToast('Link attached!');
        } catch {
          alert('Invalid URL format');
        }
      }
    } else if (tool === 'search') {
      this.openSearchModal('all');
    } else if (tool === 'all') {
      this.openAllToolsModal();
    }
  }

  /* ========================================================================
     Search & Multi-Tool Attachment Modal
     ======================================================================== */

  openSearchModal(toolType) {
    this.searchAttachmentModal.hidden = false;
    this.searchAttachmentModal.classList.add('is-open');
    this.mediaQueryInput.value = '';
    this.mediaSearchResults.innerHTML = '';
    this.mediaQueryInput.placeholder = toolType === 'video' ? 'Search YouTube videos...' : 'Search web or images...';
    this.mediaQueryInput.focus();

    // Default suggestions
    this.performMediaSearch('physics');
  }

  closeSearchModal() {
    this.searchAttachmentModal.hidden = true;
    this.searchAttachmentModal.classList.remove('is-open');
  }

  async performMediaSearch(query) {
    this.mediaSearchResults.innerHTML = '<div style="grid-column: span 2; text-align: center; color: #888;">Searching...</div>';

    try {
      // Connect to the Padlet search API endpoint reverse-engineered earlier!
      const res = await fetch(`https://disco.padlet.com/api/1/images?q=${encodeURIComponent(query)}&locale=en-US`);
      const data = await res.json();
      const images = data?.data?.images || [];

      this.mediaSearchResults.innerHTML = '';

      if (images.length === 0) {
        this.mediaSearchResults.innerHTML = '<div style="grid-column: span 2; text-align: center; color: #888;">No results found.</div>';
        return;
      }

      images.slice(0, 8).forEach(img => {
        const item = document.createElement('div');
        item.className = 'media-result-item';
        item.innerHTML = `
          <img src="${img.thumbnail_url || img.url}" class="media-result-thumb" alt="${this.escapeHtml(img.title)}" />
          <div class="media-result-title">${this.escapeHtml(img.title)}</div>
        `;
        item.addEventListener('click', () => {
          this.composerState.attachment = {
            type: 'link',
            provider: img.provider_name || 'Web',
            title: img.title,
            thumbnailUrl: img.thumbnail_url || img.url,
            url: img.source_url || img.url,
            domain: new URL(img.source_url || img.url).hostname
          };
          this.updateAttachmentPreviewUI();
          this.closeSearchModal();
          this.showToast('Attachment added!');
        });
        this.mediaSearchResults.appendChild(item);
      });
    } catch (err) {
      // Offline fallback mock results
      this.mediaSearchResults.innerHTML = `
        <div class="media-result-item" onclick="app.attachMockVideo('Newton\\'s Cradle Demonstration')">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300" class="media-result-thumb" />
          <div class="media-result-title">Newton's Cradle Demonstration (YouTube)</div>
        </div>
        <div class="media-result-item" onclick="app.attachMockLink('Science Journal Research')">
          <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300" class="media-result-thumb" />
          <div class="media-result-title">Science Journal Article (Web)</div>
        </div>
      `;
    }
  }

  attachMockVideo(title) {
    this.composerState.attachment = {
      type: 'video',
      provider: 'YouTube',
      title: title,
      caption: title,
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      videoUrl: 'https://youtube.com'
    };
    this.updateAttachmentPreviewUI();
    this.closeSearchModal();
    this.showToast('YouTube video attached!');
  }

  attachMockLink(title) {
    this.composerState.attachment = {
      type: 'link',
      provider: 'Web Link',
      title: title,
      domain: 'science.org',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
      url: 'https://science.org'
    };
    this.updateAttachmentPreviewUI();
    this.closeSearchModal();
    this.showToast('Web link attached!');
  }

  /* ========================================================================
     Global Event Listeners
     ======================================================================== */

  attachEventListeners() {
    // Backdrop click for Centered Edit Post Modal
    if (this.editPostModalOverlay) {
      this.editPostModalOverlay.addEventListener('click', (e) => {
        if (e.target === this.editPostModalOverlay) {
          this.cancelEditPost();
        }
      });
    }

    // Keyboard shortcuts (Escape to dismiss, Cmd/Ctrl+Enter to submit)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.avRecorderModal && !this.avRecorderModal.hidden) {
          this.closeAvRecorderModal();
          return;
        }
        if (this.drawModal && !this.drawModal.hidden) {
          this.closeDrawModal();
          return;
        }
        if (this.pollModal && !this.pollModal.hidden) {
          this.closePollModal();
          return;
        }
        if (this.locationModal && !this.locationModal.hidden) {
          this.closeLocationModal();
          return;
        }
        if (this.editingCardId) {
          this.cancelEditPost();
          return;
        }
        this.closeComposer();
        this.closeSearchModal();
        this.searchOverlay.hidden = true;
        this.searchOverlay.classList.remove('is-open');
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (this.editingCardId) {
          e.preventDefault();
          this.saveEditedCard();
        } else if (this.activeDraftId && !this.publishBtn.disabled) {
          e.preventDefault();
          this.publishActiveDraft();
        }
      }
    });

    // Window actions for Post Composer
    document.getElementById('closeModalBtn')?.addEventListener('click', () => this.closeActiveDraft());
    document.getElementById('minimizeModalBtn')?.addEventListener('click', () => this.minimizeActiveDraft());
    document.getElementById('expandModalBtn')?.addEventListener('click', () => this.toggleComposerExpanded());
    document.getElementById('schedulePostBtn')?.addEventListener('click', () => this.openScheduleModal());
    document.getElementById('closeSubmodalBtn')?.addEventListener('click', () => this.closeSearchModal());

    // Drafts Bulk Action Dropdown
    this.dockBulkActionBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.draftsBulkMenu) this.draftsBulkMenu.hidden = !this.draftsBulkMenu.hidden;
    });

    this.bulkPublishAllBtn?.addEventListener('click', () => this.publishAllDrafts());
    this.bulkDeleteAllBtn?.addEventListener('click', () => this.deleteAllDrafts());

    document.addEventListener('click', (e) => {
      if (this.draftsBulkMenu && !this.draftsBulkMenu.hidden && this.dockBulkActionWrapper && !this.dockBulkActionWrapper.contains(e.target)) {
        this.draftsBulkMenu.hidden = true;
      }
      if (this.sectionContextMenu && !this.sectionContextMenu.hidden && !this.sectionContextMenu.contains(e.target)) {
        this.closeSectionContextMenu();
      }
    });

    this.searchAttachmentModal?.addEventListener('click', (e) => {
      if (e.target === this.searchAttachmentModal) this.closeSearchModal();
    });

    // Yellow "+ Post" button opens Composer
    const mainPostBtn = document.getElementById('mainPostBtn');
    if (mainPostBtn) {
      mainPostBtn.addEventListener('click', () => {
        this.createNewDraft(this.state.sections[0]?.id);
      });
      mainPostBtn.addEventListener('mousedown', () => mainPostBtn.classList.add('is-pressed'));
      mainPostBtn.addEventListener('mouseup', () => mainPostBtn.classList.remove('is-pressed'));
      mainPostBtn.addEventListener('mouseleave', () => mainPostBtn.classList.remove('is-pressed'));
      mainPostBtn.addEventListener('touchstart', () => mainPostBtn.classList.add('is-pressed'), { passive: true });
      mainPostBtn.addEventListener('touchend', () => mainPostBtn.classList.remove('is-pressed'), { passive: true });
      mainPostBtn.addEventListener('touchcancel', () => mainPostBtn.classList.remove('is-pressed'), { passive: true });
    }

    // Title & Body typing state for Publish button
    this.titleInput.addEventListener('input', () => this.updatePublishButtonState());
    this.bodyInput.addEventListener('input', () => {
      this.updatePublishButtonState();
      this.adjustBodyTextareaHeight();
      const scrollArea = document.querySelector('.composer-scroll-area');
      if (scrollArea && scrollArea.scrollHeight > scrollArea.clientHeight) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    });

    // Publish click
    this.publishBtn.addEventListener('click', () => this.publishActiveDraft());

    // Color Popover toggle (Picture 2)
    document.getElementById('composerPaletteBtn')?.addEventListener('click', (e) => {
      this.toggleColorPopover(e);
    });

    this.colorPickerPill?.addEventListener('click', (e) => {
      this.toggleColorPopover(e);
    });

    // Section Popover toggle (Picture 3)
    this.sectionSelectorPill.addEventListener('click', (e) => {
      this.toggleSectionPopover(e);
    });

    // "New" Section from Popover button (Picture 3)
    if (this.popoverNewSectionBtn) {
      this.popoverNewSectionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextNum = this.state.sections.length + 1;
        const name = prompt('Section name:', `Section ${nextNum}`);
        if (name && name.trim()) {
          const newSec = {
            id: 'sec-' + Date.now(),
            title: name.trim(),
            cards: []
          };
          this.state.sections.push(newSec);
          this.composerState.selectedSectionId = newSec.id;
          this.saveState();
          this.renderBoard();
          this.updateSectionSelectorUI();
          this.closeAllPopovers();
          this.showToast(`Created & selected ${newSec.title}`);
        }
      });
    }

    // Post Fields Modal toggle & close (Picture 4)
    if (this.composerFieldsBtn) {
      this.composerFieldsBtn.addEventListener('click', (e) => {
        this.openPostFieldsModal(e);
      });
    }

    if (this.closePostFieldsBtn) {
      this.closePostFieldsBtn.addEventListener('click', () => {
        this.closePostFieldsModal();
      });
    }

    if (this.postFieldsModal) {
      this.postFieldsModal.addEventListener('click', (e) => {
        if (e.target === this.postFieldsModal) {
          this.closePostFieldsModal();
        }
      });
    }

    if (this.addCustomFieldBtn) {
      this.addCustomFieldBtn.addEventListener('click', () => {
        this.openCustomFieldBuilder();
      });
    }

    // Draft Undo button listener (Blueprint Section 7.1)
    if (this.draftUndoBtn) {
      this.draftUndoBtn.addEventListener('click', () => {
        this.undoDiscardDraft();
      });
    }

    // Close popovers and menus when clicking outside
    document.addEventListener('click', (e) => {
      if (this.colorSelectPopover && !this.colorSelectPopover.hidden) {
        if (!this.colorPickerPill.contains(e.target) && !this.colorSelectPopover.contains(e.target)) {
          this.colorSelectPopover.hidden = true;
        }
      }
      if (this.sectionSelectPopover && !this.sectionSelectPopover.hidden) {
        if (!this.sectionSelectorPill.contains(e.target) && !this.sectionSelectPopover.contains(e.target)) {
          this.sectionSelectPopover.hidden = true;
        }
      }
      if (this.cardContextMenu && !this.cardContextMenu.hidden) {
        if (!this.cardContextMenu.contains(e.target)) {
          this.closeCardContextMenu();
        }
      }
      if (this.emojiPickerPopover && !this.emojiPickerPopover.hidden) {
        if (!this.emojiPickerPopover.contains(e.target) && !e.target.closest('.reaction-add-btn') && !e.target.closest('.reaction-pill')) {
          this.closeEmojiPicker();
        }
      }
    });

    // Dismiss context menu on right click outside
    document.addEventListener('contextmenu', (e) => {
      if (this.cardContextMenu && !this.cardContextMenu.hidden && !this.cardContextMenu.contains(e.target)) {
        if (!e.target.closest('.padlet-card')) {
          this.closeCardContextMenu();
        }
      }
    });

    // Global Keydown: Escape key and Ctrl+Z Undo
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSectionContextMenu();
        this.closeCardContextMenu();
        this.closeEmojiPicker();
        this.closeCardDetailModal();
        this.closeScheduleModal();
        this.closeAllToolsModal();
        this.closeCustomFieldBuilder();
        this.closeAllPopovers();
        this.closePostFieldsModal();
        this.closeSearchModal();
        this.closeCloudSettingsModal();
      }

      // Ctrl + Z for Draft Restoration (Blueprint Section 7.1)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (tag !== 'input' && tag !== 'textarea') {
          if (this.lastDiscardedDraft) {
            e.preventDefault();
            this.undoDiscardDraft();
          }
        }
      }
    });

    // Remove attachment badge button
    this.removeAttachmentBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.composerState.attachment = null;
      if (this.activeDraftId) {
        const draft = this.state.drafts.find(d => d.id === this.activeDraftId);
        if (draft) draft.attachment = null;
      }
      if (this.editingCardId) {
        const card = this.findCardById(this.editingCardId);
        if (card) {
          card.attachment = null;
          card.type = 'text';
        }
      }
      this.updateAttachmentPreviewUI();
      this.syncActiveDraftFromInputs();
      this.saveState();
    });

    // Initialize Padlet Striped Multi-Tool Toolbar & Shortcuts
    this.initAttachmentToolbar();

    // Submodal Search button & Enter key
    document.getElementById('doSearchBtn')?.addEventListener('click', () => {
      const q = this.mediaQueryInput?.value.trim();
      if (q) this.performMediaSearch(q);
    });

    this.mediaQueryInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = this.mediaQueryInput.value.trim();
        if (q) this.performMediaSearch(q);
      }
    });

    // Add Section button
    document.getElementById('addSectionBtn')?.addEventListener('click', () => {
      const nextNum = this.state.sections.length + 1;
      const newSec = {
        id: 'sec-' + Date.now(),
        title: `Section ${nextNum}`,
        cards: []
      };
      this.state.sections.push(newSec);
      this.saveState();
      this.renderBoard();
      this.showToast(`Added ${newSec.title}`);
      this.sectionsTrack.parentElement.scrollLeft = this.sectionsTrack.parentElement.scrollWidth;

      if (this.backend && this.backend.isConnected) {
        this.backend.createSection(newSec);
      }
    });

    // Search Toggle in Top Header
    document.getElementById('searchToggleBtn')?.addEventListener('click', () => {
      const isOpen = this.searchOverlay.classList.contains('is-open');
      if (isOpen) {
        this.searchOverlay.hidden = true;
        this.searchOverlay.classList.remove('is-open');
      } else {
        this.searchOverlay.hidden = false;
        this.searchOverlay.classList.add('is-open');
        this.boardSearchInput.focus();
      }
    });

    document.getElementById('closeSearchBtn')?.addEventListener('click', () => {
      this.searchOverlay.hidden = true;
      this.searchOverlay.classList.remove('is-open');
      this.boardSearchInput.value = '';
      this.filterBoard('');
    });

    this.boardSearchInput.addEventListener('input', (e) => {
      this.filterBoard(e.target.value);
    });

  }

  /* ========================================================================
     1. Slideshow Presentation Deck
     ======================================================================== */

  initSlideshow() {
    this.slideshowModal = document.getElementById('slideshowModal');
    this.slideshowSlideViewport = document.getElementById('slideshowSlideViewport');
    this.slideshowCounter = document.getElementById('slideshowCounter');
    this.slideshowPrevBtn = document.getElementById('slideshowPrevBtn');
    this.slideshowNextBtn = document.getElementById('slideshowNextBtn');
    this.slideshowPlayBtn = document.getElementById('slideshowPlayBtn');
    this.slideshowPlayIcon = document.getElementById('slideshowPlayIcon');
    this.slideshowTimelineTrack = document.getElementById('slideshowTimelineTrack');
    this.slideshowState = { activeIndex: 0, slides: [], isPlaying: false, timer: null };

    document.getElementById('slideshowBtn')?.addEventListener('click', () => this.openSlideshow());
    document.getElementById('exitSlideshowBtn')?.addEventListener('click', () => this.exitSlideshow());
    this.slideshowPrevBtn?.addEventListener('click', () => this.prevSlide());
    this.slideshowNextBtn?.addEventListener('click', () => this.nextSlide());
    this.slideshowPlayBtn?.addEventListener('click', () => this.togglePlaySlideshow());
    document.getElementById('slideshowShareBtn')?.addEventListener('click', () => {
      this.exitSlideshow();
      this.openShareDrawer();
    });
    document.getElementById('slideshowFullscreenBtn')?.addEventListener('click', () => this.toggleFullscreen());

    // Keyboard navigation in slideshow
    window.addEventListener('keydown', (e) => {
      if (this.slideshowModal && !this.slideshowModal.hidden) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          this.nextSlide();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prevSlide();
        } else if (e.key === 'Escape') {
          this.exitSlideshow();
        }
      }
    });
  }

  openSlideshow(startCardId = null) {
    const slides = [
      {
        type: 'title',
        title: this.state.boardTitle || 'Physics Audio Reflections: I see, I think, I wonder',
        author: this.state.boardAuthor || 'Salman Madani • 6d'
      }
    ];

    this.state.sections.forEach(sec => {
      sec.cards.forEach(card => {
        slides.push({
          type: 'card',
          section: sec,
          card: card
        });
      });
    });

    this.slideshowState.slides = slides;
    this.slideshowState.activeIndex = 0;

    if (startCardId) {
      const idx = slides.findIndex(s => s.card && s.card.id === startCardId);
      if (idx !== -1) this.slideshowState.activeIndex = idx;
    }

    if (this.slideshowModal) this.slideshowModal.hidden = false;
    this.renderSlideshowSlide();
  }

  exitSlideshow() {
    if (this.slideshowState.timer) {
      clearInterval(this.slideshowState.timer);
      this.slideshowState.timer = null;
    }
    this.slideshowState.isPlaying = false;
    if (this.slideshowPlayIcon) {
      this.slideshowPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
    if (this.slideshowModal) this.slideshowModal.hidden = true;
  }

  renderSlideshowSlide() {
    const { activeIndex, slides } = this.slideshowState;
    if (!slides.length || !this.slideshowSlideViewport) return;

    const current = slides[activeIndex];
    if (this.slideshowCounter) this.slideshowCounter.textContent = `${activeIndex + 1} / ${slides.length}`;
    if (this.slideshowPrevBtn) this.slideshowPrevBtn.disabled = activeIndex === 0;
    if (this.slideshowNextBtn) this.slideshowNextBtn.disabled = activeIndex === slides.length - 1;

    // Render timeline notches
    if (this.slideshowTimelineTrack) {
      this.slideshowTimelineTrack.innerHTML = '';
      slides.forEach((_, idx) => {
        const notch = document.createElement('div');
        notch.className = `slideshow-timeline-notch ${idx === activeIndex ? 'is-active' : ''}`;
        notch.title = `Slide ${idx + 1}`;
        notch.addEventListener('click', () => {
          this.slideshowState.activeIndex = idx;
          this.renderSlideshowSlide();
        });
        this.slideshowTimelineTrack.appendChild(notch);
      });
    }

    if (current.type === 'title') {
      this.slideshowSlideViewport.innerHTML = `
        <div class="slideshow-title-slide">
          <div class="slideshow-qr-corner">
            ${this.generateQrSvg(window.location.href)}
          </div>
          <div class="slideshow-title-author">${this.escapeHtml(current.author)}</div>
          <div class="slideshow-title-heading">${this.escapeHtml(current.title)}</div>
        </div>
      `;
    } else {
      const { section, card } = current;
      let mediaHtml = '';
      if (card.attachment) {
        if (card.attachment.type === 'youtube' || card.attachment.videoUrl) {
          mediaHtml = `
            <div class="slideshow-slide-media">
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
            </div>
          `;
        } else if (card.attachment.imageUrl || card.attachment.thumbnailUrl) {
          mediaHtml = `
            <div class="slideshow-slide-media">
              <img src="${this.escapeHtml(card.attachment.imageUrl || card.attachment.thumbnailUrl)}" alt="${this.escapeHtml(card.title || 'Slide image')}" />
            </div>
          `;
        }
      }

      let bodyText = '';
      if (card.content) {
        if (card.content.intro) bodyText += card.content.intro + '\n\n';
        if (card.content.body) bodyText += card.content.body;
      } else if (card.attachment && card.attachment.caption) {
        bodyText = card.attachment.caption;
      }

      this.slideshowSlideViewport.innerHTML = `
        <div class="slideshow-card-slide">
          <div class="slideshow-slide-section-pill">${this.escapeHtml(section.title)}</div>
          <div class="slideshow-slide-title">${this.escapeHtml(card.title || 'Untitled note')}</div>
          ${mediaHtml}
          ${bodyText ? `<div class="slideshow-slide-body">${this.escapeHtml(bodyText)}</div>` : ''}
          <div class="slideshow-slide-footer">
            <span>Posted by contributor</span>
            <span>${card.reactions || 0} reflections</span>
          </div>
        </div>
      `;
    }
  }

  nextSlide() {
    if (this.slideshowState.activeIndex < this.slideshowState.slides.length - 1) {
      this.slideshowState.activeIndex++;
      this.renderSlideshowSlide();
    } else if (this.slideshowState.isPlaying) {
      this.slideshowState.activeIndex = 0;
      this.renderSlideshowSlide();
    }
  }

  prevSlide() {
    if (this.slideshowState.activeIndex > 0) {
      this.slideshowState.activeIndex--;
      this.renderSlideshowSlide();
    }
  }

  togglePlaySlideshow() {
    this.slideshowState.isPlaying = !this.slideshowState.isPlaying;
    if (this.slideshowState.isPlaying) {
      if (this.slideshowPlayIcon) {
        this.slideshowPlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      }
      this.showToast('Auto-play started (4s)');
      this.slideshowState.timer = setInterval(() => this.nextSlide(), 4000);
    } else {
      if (this.slideshowPlayIcon) {
        this.slideshowPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      }
      clearInterval(this.slideshowState.timer);
      this.slideshowState.timer = null;
      this.showToast('Auto-play paused');
    }
  }

  /* ========================================================================
     2. Share Drawer & QR Modal
     ======================================================================== */

  initShareDrawer() {
    this.shareDrawer = document.getElementById('shareDrawer');
    this.qrModal = document.getElementById('qrModal');

    document.getElementById('shareBtn')?.addEventListener('click', () => this.openShareDrawer());
    document.getElementById('closeShareDrawerBtn')?.addEventListener('click', () => this.closeShareDrawer());
    this.shareDrawer?.addEventListener('click', (e) => {
      if (e.target === this.shareDrawer) this.closeShareDrawer();
    });

    // Quick Tiles
    document.getElementById('quickCopyLinkBtn')?.addEventListener('click', () => this.copyBoardLink());
    document.getElementById('shareCopyLinkItem')?.addEventListener('click', () => this.copyBoardLink());

    document.getElementById('quickQrCodeBtn')?.addEventListener('click', () => this.openQrModal());
    document.getElementById('shareQrCodeItem')?.addEventListener('click', () => this.openQrModal());
    document.getElementById('closeQrModalBtn')?.addEventListener('click', () => this.closeQrModal());
    this.qrModal?.addEventListener('click', (e) => {
      if (e.target === this.qrModal) this.closeQrModal();
    });

    document.getElementById('quickEmbedBtn')?.addEventListener('click', () => this.copyEmbedSnippet());
    document.getElementById('shareEmbedItem')?.addEventListener('click', () => this.copyEmbedSnippet());

    document.getElementById('quickExportPdfBtn')?.addEventListener('click', () => window.print());
    document.getElementById('exportPdfItem')?.addEventListener('click', () => window.print());
    document.getElementById('exportImageItem')?.addEventListener('click', () => window.print());
    document.getElementById('printBoardItem')?.addEventListener('click', () => window.print());

    document.getElementById('exportCsvItem')?.addEventListener('click', () => this.exportCsv());
  }

  openShareDrawer() {
    this.closeAllDrawers();
    if (this.shareDrawer) this.shareDrawer.hidden = false;
  }

  closeShareDrawer() {
    if (this.shareDrawer) this.shareDrawer.hidden = true;
  }

  openQrModal() {
    if (!this.qrModal) return;
    const container = document.getElementById('qrCanvasContainer');
    if (container) {
      container.innerHTML = this.generateQrSvg(window.location.href);
    }
    this.qrModal.hidden = false;
  }

  closeQrModal() {
    if (this.qrModal) this.qrModal.hidden = true;
  }

  copyBoardLink() {
    navigator.clipboard?.writeText(window.location.href);
    this.showToast('Board link copied to clipboard!');
  }

  copyEmbedSnippet() {
    const snippet = `<iframe src="${window.location.href}" width="100%" height="600" style="border:0;border-radius:16px;" allowfullscreen></iframe>`;
    navigator.clipboard?.writeText(snippet);
    this.showToast('Embed code copied to clipboard!');
  }

  exportCsv() {
    let csv = 'Section,Title,Type,Color,Content,Reactions\n';
    this.state.sections.forEach(sec => {
      sec.cards.forEach(c => {
        let body = '';
        if (c.content && c.content.body) body = c.content.body;
        else if (c.attachment && c.attachment.caption) body = c.attachment.caption;
        const line = [
          `"${(sec.title || '').replace(/"/g, '""')}"`,
          `"${(c.title || '').replace(/"/g, '""')}"`,
          `"${c.type || 'text'}"`,
          `"${c.color || 'white'}"`,
          `"${body.replace(/"/g, '""')}"`,
          `"${c.reactions || 0}"`
        ].join(',');
        csv += line + '\n';
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'padles-physics-reflections.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Exported padles-physics-reflections.csv');
  }

  /* ========================================================================
     3. Padlet Authentic Settings Panel (surfaceSettingsMainPanel)
     ======================================================================== */

  initSettingsDrawer() {
    this.settingsPanel = document.getElementById('surfaceSettingsMainPanel');
    this.settingsDrawer = this.settingsPanel;

    // Open button triggers (both topbar button and any legacy trigger)
    document.getElementById('surfaceSettingsButton')?.addEventListener('click', () => this.openSettingsDrawer());
    document.getElementById('settingsBtn')?.addEventListener('click', () => this.openSettingsDrawer());

    // Close button triggers
    document.getElementById('settingsMainPanelCloseButton')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsWallpaperCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsIconCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsFormatCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsSortCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsReactionsCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());
    document.getElementById('settingsCommentsCloseBtn')?.addEventListener('click', () => this.closeSettingsDrawer());

    // Backdrop click closes settings
    this.settingsPanel?.addEventListener('click', (e) => {
      if (e.target === this.settingsPanel) this.closeSettingsDrawer();
    });

    // Escape key closes settings
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.settingsPanel && !this.settingsPanel.hidden) {
        this.closeSettingsDrawer();
      }
    });

    // Subview Back Buttons
    document.getElementById('settingsWallpaperBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsIconBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsFormatBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsSortBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsReactionsBackBtn')?.addEventListener('click', () => this.backToMainSettings());
    document.getElementById('settingsCommentsBackBtn')?.addEventListener('click', () => this.backToMainSettings());

    // Navigation Tabs with smooth anchor scroll & sliding indicator
    const tabItems = document.querySelectorAll('.settings-tab-item');
    tabItems.forEach(tab => {
      tab.addEventListener('click', () => {
        tabItems.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.updateTabIndicator(tab);

        const targetId = tab.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 1. Heading Section Inputs
    const titleInput = document.getElementById('wall-title-input');
    titleInput?.addEventListener('input', (e) => {
      const val = e.target.value;
      this.state.title = val;
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.title = val;
      const titleEl = document.getElementById('boardTitle');
      if (titleEl) titleEl.textContent = val || 'Untitled Padles';
      document.title = `${val || 'Untitled Padles'} — Padles`;
      this.saveState();
      this.syncSettingsToCloud();
    });

    const descInput = document.getElementById('wall-desc-input');
    descInput?.addEventListener('input', (e) => {
      const val = e.target.value;
      this.state.description = val;
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.description = val;
      const descEl = document.getElementById('boardDescription');
      if (descEl) {
        descEl.textContent = val;
        descEl.style.display = val ? 'block' : 'none';
      }
      this.saveState();
      this.syncSettingsToCloud();
    });

    // Icon row opens Icon Picker subpanel
    document.getElementById('settingRowIcon')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsIconSubview');
    });

    // 2. Appearance Section
    document.getElementById('settingRowWallpaper')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsWallpaperSubview');
    });

    document.getElementById('colorSchemeDarkBtn')?.addEventListener('click', () => {
      this.applyColorScheme('dark');
      this.saveState();
      this.syncSettingsToCloud();
    });

    document.getElementById('colorSchemeLightBtn')?.addEventListener('click', () => {
      this.applyColorScheme('light');
      this.saveState();
      this.syncSettingsToCloud();
    });

    document.getElementById('fontBtnNiagara')?.addEventListener('click', () => { this.applyFont('niagara'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('fontBtnThames')?.addEventListener('click', () => { this.applyFont('thames'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('fontBtnFuji')?.addEventListener('click', () => { this.applyFont('fuji'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('fontBtnAlps')?.addEventListener('click', () => { this.applyFont('alps'); this.saveState(); this.syncSettingsToCloud(); });

    document.getElementById('postSizeStandardBtn')?.addEventListener('click', () => { this.applyPostSize('standard'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('postSizeWideBtn')?.addEventListener('click', () => { this.applyPostSize('wide'); this.saveState(); this.syncSettingsToCloud(); });

    // 3. Layout Section
    document.getElementById('settingRowFormat')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsFormatSubview');
    });

    document.getElementById('settingRowSort')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsSortSubview');
    });

    document.getElementById('newPostFirstBtn')?.addEventListener('click', () => { this.applyNewPostPosition('first'); this.saveState(); this.syncSettingsToCloud(); });
    document.getElementById('newPostLastBtn')?.addEventListener('click', () => { this.applyNewPostPosition('last'); this.saveState(); this.syncSettingsToCloud(); });

    // 4. Posts Section
    document.getElementById('settingRowPostFields')?.addEventListener('click', () => {
      this.closeSettingsDrawer();
      this.openPostFieldsModal();
    });

    document.getElementById('settingAuthorTimeToggle')?.addEventListener('click', () => {
      const current = !(this.state.settings?.showAuthorAndTime === false);
      this.applyAttribution(!current);
      this.saveState();
      this.syncSettingsToCloud();
    });

    // 5. Engagement Section
    document.getElementById('settingRowComments')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsCommentsSubview');
    });

    document.getElementById('settingRowEmojiPreset')?.addEventListener('click', () => {
      this.showSettingsSubview('settingsReactionsSubview');
    });

    // 6. Content Section
    document.getElementById('settingModerationBtn')?.addEventListener('click', () => {
      const modes = ['auto', 'manual', 'none'];
      const curr = this.state.settings?.moderation || 'auto';
      const next = modes[(modes.indexOf(curr) + 1) % modes.length];
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.moderation = next;
      const lbl = document.getElementById('currentModerationLabel');
      if (lbl) lbl.textContent = next.charAt(0).toUpperCase() + next.slice(1);
      this.saveState();
      this.syncSettingsToCloud();
      this.showToast(`Moderation set to ${next}`);
    });

    document.getElementById('settingCopyProtectionBtn')?.addEventListener('click', () => {
      const curr = this.state.settings?.copyProtection || 'none';
      const next = curr === 'none' ? 'protected' : 'none';
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.copyProtection = next;
      const lbl = document.getElementById('currentCopyProtectionLabel');
      if (lbl) lbl.textContent = next === 'none' ? 'None' : 'Protected';
      this.saveState();
      this.syncSettingsToCloud();
      this.showToast(`Copy protection: ${next === 'none' ? 'Disabled' : 'Enabled'}`);
    });

    // 7. Advanced Section
    document.getElementById('surfaceUrlCopyButton')?.addEventListener('click', () => {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          this.showToast('Board URL copied to clipboard!');
        });
      } else {
        const inp = document.getElementById('surfaceSettingsChangeUrlInput');
        if (inp) {
          inp.select();
          document.execCommand('copy');
          this.showToast('Board URL copied to clipboard!');
        }
      }
    });

    // Initialize subpanels
    this.initWallpaperSubview();
    this.initIconSubview();
    this.initFormatSubview();
    this.initSortSubview();
    this.initReactionsSubview();
    this.initCommentsSubview();
  }

  openSettingsDrawer() {
    this.closeAllDrawers();
    this.backToMainSettings();

    // Populate current values in inputs
    const s = this.state.settings || {};
    const titleInput = document.getElementById('wall-title-input');
    if (titleInput) titleInput.value = s.title || this.state.title || 'Physics Audio Reflections: I see, I think, I wonder';

    const descInput = document.getElementById('wall-desc-input');
    if (descInput) descInput.value = s.description !== undefined ? s.description : (this.state.description || '');

    const urlInput = document.getElementById('surfaceSettingsChangeUrlInput');
    if (urlInput) urlInput.value = window.location.href;

    const urlCaption = document.getElementById('currentUrlCaption');
    if (urlCaption) urlCaption.textContent = window.location.href;

    if (this.settingsPanel) this.settingsPanel.hidden = false;

    // Update tab indicator on first visible tab
    requestAnimationFrame(() => {
      const activeTab = document.querySelector('.settings-tab-item.active') || document.querySelector('.settings-tab-item');
      if (activeTab) this.updateTabIndicator(activeTab);
    });
  }

  closeSettingsDrawer() {
    if (this.settingsPanel) this.settingsPanel.hidden = true;
  }

  showSettingsSubview(subviewId) {
    document.querySelectorAll('.padlet-settings-container .settings-subview').forEach(v => {
      v.classList.remove('active');
    });
    const target = document.getElementById(subviewId);
    if (target) target.classList.add('active');
  }

  backToMainSettings() {
    this.showSettingsSubview('settingsMainView');
    requestAnimationFrame(() => {
      const activeTab = document.querySelector('.settings-tab-item.active');
      if (activeTab) this.updateTabIndicator(activeTab);
    });
  }

  updateTabIndicator(tabEl) {
    const indicator = document.getElementById('settingsTabIndicator');
    if (indicator && tabEl) {
      indicator.style.left = `${tabEl.offsetLeft}px`;
      indicator.style.width = `${tabEl.offsetWidth}px`;
    }
  }

  applyLoadedSettings() {
    const s = this.state.settings || {};
    
    // 1. Title
    const title = s.title || this.state.title || 'Physics Audio Reflections: I see, I think, I wonder';
    const titleEl = document.getElementById('boardTitle');
    if (titleEl) titleEl.textContent = title;
    document.title = `${title} — Padles`;
    const titleInput = document.getElementById('wall-title-input');
    if (titleInput) titleInput.value = title;

    // 2. Description
    const desc = s.description !== undefined ? s.description : (this.state.description || '');
    const descEl = document.getElementById('boardDescription');
    if (descEl) {
      descEl.textContent = desc;
      descEl.style.display = desc ? 'block' : 'none';
    }
    const descInput = document.getElementById('wall-desc-input');
    if (descInput) descInput.value = desc;

    // 3. Icon
    const icon = s.icon || '';
    const iconEl = document.getElementById('boardIcon');
    if (iconEl) {
      iconEl.textContent = icon;
      iconEl.style.display = icon ? 'inline-block' : 'none';
    }
    const iconDisplay = document.getElementById('settingCurrentIconDisplay');
    if (iconDisplay) iconDisplay.textContent = icon || 'None';

    // 4. Wallpaper
    this.applyWallpaper(s.wallpaper || 'aurora');

    // 5. Color Scheme
    this.applyColorScheme(s.colorScheme || 'dark');

    // 6. Font
    this.applyFont(s.font || 'niagara');

    // 7. Post Size
    this.applyPostSize(s.postSize || 'standard');

    // 8. Layout Format
    this.applyLayoutFormat(s.layoutFormat || 'columns');

    // 9. Attribution
    this.applyAttribution(s.showAuthorAndTime !== false);

    // 10. Comments
    this.applyComments(s.commentsEnabled !== false);

    // 11. Reactions Preset
    this.applyReactionsPreset(s.reactionsPreset || 'all');

    // 12. Sort & New Post Position
    this.applySort(s.sortBy || 'manual');
    this.applyNewPostPosition(s.newPostPosition || 'last');

    // Moderation & Copy Protection
    const modLbl = document.getElementById('currentModerationLabel');
    if (modLbl) modLbl.textContent = (s.moderation || 'auto').charAt(0).toUpperCase() + (s.moderation || 'auto').slice(1);

    const cpLbl = document.getElementById('currentCopyProtectionLabel');
    if (cpLbl) cpLbl.textContent = s.copyProtection === 'protected' ? 'Protected' : 'None';
  }

  applyWallpaper(wpId) {
    const classesToRemove = Array.from(document.body.classList).filter(c => c.startsWith('wallpaper-') || c.startsWith('theme-'));
    classesToRemove.forEach(c => document.body.classList.remove(c));

    if (wpId.startsWith('http://') || wpId.startsWith('https://') || wpId.startsWith('data:image')) {
      document.body.style.backgroundImage = `url("${wpId}")`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.classList.add('aurora-theme');
    } else {
      document.body.style.backgroundImage = '';
      if (wpId === 'aurora') {
        document.body.classList.add('aurora-theme');
      } else {
        document.body.classList.add(`wallpaper-${wpId}`);
      }
    }

    const thumb = document.getElementById('settingWallpaperThumbPreview');
    if (thumb) {
      if (wpId.startsWith('http') || wpId.startsWith('data:')) {
        thumb.style.backgroundImage = `url("${wpId}")`;
        thumb.className = 'wallpaper-thumb-preview';
      } else {
        thumb.className = `wallpaper-thumb-preview ${wpId === 'aurora' ? 'theme-swatch-aurora' : 'wallpaper-' + wpId}`;
        thumb.style.backgroundImage = '';
      }
    }

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.wallpaper = wpId;
  }

  applyColorScheme(scheme) {
    document.body.classList.toggle('light-theme', scheme === 'light');
    document.body.classList.toggle('dark-theme', scheme === 'dark');

    document.getElementById('colorSchemeDarkBtn')?.classList.toggle('active', scheme === 'dark');
    document.getElementById('colorSchemeLightBtn')?.classList.toggle('active', scheme === 'light');

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.colorScheme = scheme;
  }

  applyFont(fontName) {
    document.body.dataset.boardFont = fontName;
    ['fontBtnNiagara', 'fontBtnThames', 'fontBtnFuji', 'fontBtnAlps'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.classList.toggle('active', (id === 'fontBtnNiagara' && fontName === 'niagara') ||
                                        (id === 'fontBtnThames' && fontName === 'thames') ||
                                        (id === 'fontBtnFuji' && fontName === 'fuji') ||
                                        (id === 'fontBtnAlps' && fontName === 'alps'));
      }
    });
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.font = fontName;
  }

  applyPostSize(size) {
    document.body.dataset.postSize = size;
    document.getElementById('postSizeStandardBtn')?.classList.toggle('active', size === 'standard');
    document.getElementById('postSizeWideBtn')?.classList.toggle('active', size === 'wide');
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.postSize = size;
  }

  applyLayoutFormat(format) {
    document.body.dataset.layoutFormat = format;
    const formatName = format.charAt(0).toUpperCase() + format.slice(1);
    const label = document.getElementById('currentFormatLabel');
    if (label) label.textContent = format === 'columns' ? 'Columns' : formatName;
    const caption = document.getElementById('currentFormatCaption');
    if (caption) caption.textContent = format === 'columns' ? 'Columns' : formatName;

    document.querySelectorAll('.format-card-btn').forEach(card => {
      card.classList.toggle('active', card.dataset.format === format);
    });

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.layoutFormat = format;
  }

  applyAttribution(show) {
    document.body.classList.toggle('hide-post-attribution', !show);
    const toggle = document.getElementById('settingAuthorTimeToggle');
    if (toggle) {
      toggle.classList.toggle('active', show);
      toggle.setAttribute('aria-checked', show ? 'true' : 'false');
      const thumb = toggle.querySelector('.switch-thumb');
      if (thumb) {
        thumb.innerHTML = show
          ? `<svg class="switch-icon" viewBox="0 0 32 32" height="12" width="12" fill="currentColor"><path d="M11.667 25.333a1.333 1.333 0 0 1-.943-.39l-6.667-6.667a1.333 1.333 0 1 1 1.886-1.886l5.724 5.724 13.057-13.057a1.333 1.333 0 1 1 1.886 1.886l-14 14a1.333 1.333 0 0 1-.943.39z"/></svg>`
          : `<svg class="switch-icon" viewBox="0 0 32 32" height="12" width="12" fill="currentColor"><path d="M23.891 6.667a1.4 1.4 0 0 0-.984.434L16 14.008 9.093 7.101a1.41 1.41 0 0 0-1.798-.186A1.41 1.41 0 0 0 7.1 9.094l6.907 6.907L7.1 22.908a1.399 1.399 0 0 0-.33 1.549 1.42 1.42 0 0 0 .772.772 1.41 1.41 0 0 0 1.55-.33l6.907-6.907 6.907 6.907a1.399 1.399 0 0 0 1.549.33 1.405 1.405 0 0 0 .877-1.319 1.4 1.4 0 0 0-.434-1.002l-6.907-6.907 6.907-6.907a1.411 1.411 0 0 0-1.009-2.427z"/></svg>`;
      }
    }
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.showAuthorAndTime = show;
  }

  applyComments(enabled) {
    document.body.classList.toggle('comments-disabled', !enabled);
    const statusText = document.getElementById('settingCommentsStatus');
    if (statusText) statusText.textContent = enabled ? 'On' : 'Off';
    const toggle = document.getElementById('settingAllowCommentsToggle');
    if (toggle) {
      toggle.classList.toggle('active', enabled);
      toggle.setAttribute('aria-checked', enabled ? 'true' : 'false');
    }
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.commentsEnabled = enabled;
  }

  applyReactionsPreset(preset) {
    const labels = {
      all: 'All emojis',
      heart: 'Heart (❤️)',
      thumbs_up: 'Thumbs up (👍)',
      classic: 'Classic (4 emojis)',
      off: 'Off'
    };
    const lbl = labels[preset] || 'All emojis';
    const btnLabel = document.getElementById('currentEmojiPresetLabel');
    if (btnLabel) btnLabel.textContent = lbl;
    const caption = document.getElementById('currentEmojiPresetCaption');
    if (caption) caption.textContent = lbl;

    document.querySelectorAll('#settingsReactionsSubview .selection-option-card').forEach(card => {
      card.classList.toggle('active', card.dataset.reactions === preset);
    });

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.reactionsPreset = preset;
  }

  applySort(sortType) {
    const labels = {
      manual: 'Drag and drop',
      date_desc: 'Date published (Newest)',
      date_asc: 'Date published (Oldest)',
      subject_asc: 'Post subject (A to Z)',
      random: 'Random'
    };
    const sortLabel = document.getElementById('currentSortLabel');
    if (sortLabel) sortLabel.textContent = labels[sortType] || 'Drag and drop';

    document.querySelectorAll('#settingsSortSubview .selection-option-card').forEach(card => {
      card.classList.toggle('active', card.dataset.sort === sortType);
    });

    if (!this.state.settings) this.state.settings = {};
    this.state.settings.sortBy = sortType;

    if (sortType === 'subject_asc') {
      this.state.sections.forEach(sec => {
        sec.cards.sort((a, b) => (a.title || a.subject || '').localeCompare(b.title || b.subject || ''));
      });
      this.renderBoard();
    } else if (sortType === 'random') {
      this.state.sections.forEach(sec => {
        sec.cards.sort(() => Math.random() - 0.5);
      });
      this.renderBoard();
    }
  }

  applyNewPostPosition(pos) {
    document.getElementById('newPostFirstBtn')?.classList.toggle('active', pos === 'first');
    document.getElementById('newPostLastBtn')?.classList.toggle('active', pos === 'last');
    if (!this.state.settings) this.state.settings = {};
    this.state.settings.newPostPosition = pos;
  }

  syncSettingsToCloud() {
    if (this.backend && this.backend.isConnected && this.state.settings) {
      this.backend.updateBoardSettings?.(this.state.settings);
    }
  }

  initWallpaperSubview() {
    const wallpapers = [
      // Colors
      { id: 'pitch-black', name: 'Pitch Black', cat: 'colors', color: '#0a0a0a' },
      { id: 'slate-charcoal', name: 'Slate Charcoal', cat: 'colors', color: '#1e293b' },
      { id: 'pure-white', name: 'Pure White', cat: 'colors', color: '#f8fafc' },
      { id: 'soft-cream', name: 'Soft Cream', cat: 'colors', color: '#fef3c7' },
      { id: 'midnight-blue', name: 'Midnight Blue', cat: 'colors', color: '#0f172a' },
      { id: 'emerald-forest-solid', name: 'Emerald Forest', cat: 'colors', color: '#064e3b' },
      { id: 'crimson-wine', name: 'Crimson Wine', cat: 'colors', color: '#881337' },
      { id: 'royal-purple', name: 'Royal Purple', cat: 'colors', color: '#581c87' },

      // Gradients
      { id: 'aurora', name: 'Aurora Glow', cat: 'gradients', gradient: 'linear-gradient(135deg, rgb(1, 40, 50) 0%, #0d9488 50%, #0284c7 100%)' },
      { id: 'sunset-gradient', name: 'Sunset Horizon', cat: 'gradients', gradient: 'linear-gradient(135deg, #f97316 0%, #e11d48 50%, #7c3aed 100%)' },
      { id: 'neon-gradient', name: 'Neon Cyberpunk', cat: 'gradients', gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)' },
      { id: 'lavender-gradient', name: 'Lavender Mist', cat: 'gradients', gradient: 'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #fce7f3 100%)' },
      { id: 'ocean-gradient', name: 'Ocean Depths', cat: 'gradients', gradient: 'linear-gradient(135deg, #022c43 0%, #053f5c 50%, #115173 100%)' },
      { id: 'emerald-gradient', name: 'Mint Emerald', cat: 'gradients', gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)' },

      // Textures & Patterns
      { id: 'brick-wall', name: 'Brick Wall', cat: 'textures', color: '#7f1d1d' },
      { id: 'blackboard', name: 'Blackboard', cat: 'textures', color: '#1c2826' },
      { id: 'corkboard', name: 'Corkboard', cat: 'textures', color: '#b45309' },
      { id: 'blueprint', name: 'Blueprint Grid', cat: 'textures', color: '#1e3a8a' },
      { id: 'dotgrid', name: 'Dot Grid', cat: 'textures', color: '#0f172a' },
      { id: 'graphpaper', name: 'Graph Paper', cat: 'textures', color: '#ffffff' },

      // Photos
      { id: 'starry-night', name: 'Starry Night', cat: 'photos', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80' },
      { id: 'mountains', name: 'Mountains', cat: 'photos', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80' },
      { id: 'ocean', name: 'Ocean Beach', cat: 'photos', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80' },
      { id: 'cherry-blossom', name: 'Cherry Blossom', cat: 'photos', img: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=300&q=80' },
      { id: 'city-lights', name: 'City Lights', cat: 'photos', img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=300&q=80' }
    ];

    const container = document.getElementById('wallpaperCardsContainer');
    if (!container) return;

    const renderGrid = (filterCat = 'all') => {
      container.innerHTML = '';

      if (filterCat === 'custom') {
        const customBox = document.createElement('div');
        customBox.className = 'custom-wallpaper-panel';
        customBox.innerHTML = `
          <div class="settings-form-group">
            <label class="settings-field-label">Upload image file</label>
            <input type="file" id="customWpFileUpload" accept="image/*" class="settings-text-input" style="padding: 6px;" />
          </div>
          <div class="settings-form-group">
            <label class="settings-field-label">Or paste image URL</label>
            <div class="settings-input-wrapper with-action">
              <input type="url" id="customWpUrlInput" placeholder="https://example.com/wallpaper.jpg" class="settings-textarea" style="height: 32px;" />
              <button type="button" id="applyCustomWpUrlBtn" class="settings-inline-action-btn">Apply</button>
            </div>
          </div>
        `;
        container.appendChild(customBox);

        // Bind upload
        customBox.querySelector('#customWpFileUpload')?.addEventListener('change', (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (re) => {
              const dataUrl = re.target.result;
              this.applyWallpaper(dataUrl);
              this.saveState();
              this.syncSettingsToCloud();
              this.showToast('Custom wallpaper uploaded!');
              this.backToMainSettings();
            };
            reader.readAsDataURL(file);
          }
        });

        // Bind URL apply
        customBox.querySelector('#applyCustomWpUrlBtn')?.addEventListener('click', () => {
          const url = customBox.querySelector('#customWpUrlInput')?.value?.trim();
          if (url) {
            this.applyWallpaper(url);
            this.saveState();
            this.syncSettingsToCloud();
            this.showToast('Custom image applied!');
            this.backToMainSettings();
          }
        });

        return;
      }

      const grid = document.createElement('div');
      grid.className = 'wallpaper-grid';

      const filtered = filterCat === 'all' ? wallpapers : wallpapers.filter(w => w.cat === filterCat);
      const currentWp = this.state.settings?.wallpaper || 'aurora';

      filtered.forEach(w => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `wallpaper-card-btn ${currentWp === w.id ? 'active' : ''}`;
        
        const preview = document.createElement('div');
        preview.className = 'wp-card-preview';
        if (w.gradient) preview.style.background = w.gradient;
        else if (w.img) preview.style.backgroundImage = `url("${w.img}")`;
        else if (w.color) preview.style.backgroundColor = w.color;

        const name = document.createElement('div');
        name.className = 'wp-card-name';
        name.textContent = w.name;

        btn.appendChild(preview);
        btn.appendChild(name);

        btn.addEventListener('click', () => {
          document.querySelectorAll('.wallpaper-card-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.applyWallpaper(w.id);
          this.saveState();
          this.syncSettingsToCloud();
          this.showToast(`Wallpaper changed to ${w.name}`);
          this.backToMainSettings();
        });

        grid.appendChild(btn);
      });

      container.appendChild(grid);
    };

    // Category Buttons Filter
    document.querySelectorAll('.wp-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.wp-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid(btn.dataset.wpCat);
      });
    });

    renderGrid('all');
  }

  initIconSubview() {
    const emojiCategories = [
      {
        title: 'Smileys & Emotion',
        emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😜', '🤪', '🤓', '😎', '🥳', '🤗', '🤔', '🤐', '🤫', '🤭', '😴', '🥺', '😳']
      },
      {
        title: 'Animals & Nature',
        emojis: ['🌸', '🌹', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🍀', '🍁', '🍂', '🍄', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦋', '🐝', '🦄']
      },
      {
        title: 'Science & Study',
        emojis: ['💡', '📚', '📖', '🔬', '🔭', '🧪', '🧲', '⚡', '🪐', '🚀', '🛸', '🛰️', '📐', '📏', '📊', '📈', '💻', '🖥️', '⌨️', '🔋', '⚙️', '🧰', '📝', '✏️', '✒️', '🔍', '🔎', '✨', '⭐', '🌟', '💥', '🔥']
      },
      {
        title: 'Food & Activities',
        emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🍕', '🍔', '🍟', '🥪', '🌮', '🍣', '🍩', '🍪', '🎂', '☕', '🍵', '🧃', '⚽', '🏀', '🏈', '🎾', '🎮', '🎯', '🎨', '🎬']
      },
      {
        title: 'Hearts & Symbols',
        emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '⚛️', '✅', '❇️', '✳️', '🌐', '🌀', '💫', '🌈', '☀️', '🌙', '⭐', '💯']
      }
    ];

    const gridContainer = document.getElementById('iconPickerGrid');
    if (!gridContainer) return;

    const renderEmojis = (searchFilter = '') => {
      gridContainer.innerHTML = '';
      const filter = searchFilter.toLowerCase().trim();

      emojiCategories.forEach(cat => {
        const filtered = filter ? cat.emojis.filter(e => e.includes(filter)) : cat.emojis;
        if (filtered.length === 0) return;

        const block = document.createElement('div');
        block.className = 'emoji-category-block';

        const title = document.createElement('div');
        title.className = 'emoji-cat-title';
        title.textContent = cat.title;
        block.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'emoji-grid';

        filtered.forEach(emoji => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'emoji-item-btn';
          btn.textContent = emoji;

          btn.addEventListener('click', () => {
            if (!this.state.settings) this.state.settings = {};
            this.state.settings.icon = emoji;
            const iconEl = document.getElementById('boardIcon');
            if (iconEl) {
              iconEl.textContent = emoji;
              iconEl.style.display = 'inline-block';
            }
            const iconDisplay = document.getElementById('settingCurrentIconDisplay');
            if (iconDisplay) iconDisplay.textContent = emoji;
            this.saveState();
            this.syncSettingsToCloud();
            this.showToast(`Board icon set to ${emoji}`);
            this.backToMainSettings();
          });

          grid.appendChild(btn);
        });

        block.appendChild(grid);
        gridContainer.appendChild(block);
      });
    };

    // None button clears icon
    document.getElementById('iconPickerNoneBtn')?.addEventListener('click', () => {
      if (!this.state.settings) this.state.settings = {};
      this.state.settings.icon = '';
      const iconEl = document.getElementById('boardIcon');
      if (iconEl) {
        iconEl.textContent = '';
        iconEl.style.display = 'none';
      }
      const iconDisplay = document.getElementById('settingCurrentIconDisplay');
      if (iconDisplay) iconDisplay.textContent = 'None';
      this.saveState();
      this.syncSettingsToCloud();
      this.showToast('Board icon removed');
      this.backToMainSettings();
    });

    // Search filter
    document.getElementById('iconPickerSearchInput')?.addEventListener('input', (e) => {
      renderEmojis(e.target.value);
    });

    renderEmojis('');
  }

  initFormatSubview() {
    document.querySelectorAll('.format-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const format = btn.dataset.format;
        this.applyLayoutFormat(format);
        this.saveState();
        this.syncSettingsToCloud();
        this.showToast(`Layout format changed to ${format}`);
        this.backToMainSettings();
      });
    });
  }

  initSortSubview() {
    document.querySelectorAll('#settingsSortSubview .selection-option-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const sort = btn.dataset.sort;
        this.applySort(sort);
        this.saveState();
        this.syncSettingsToCloud();
        this.showToast('Sort order updated');
        this.backToMainSettings();
      });
    });
  }

  initReactionsSubview() {
    document.querySelectorAll('#settingsReactionsSubview .selection-option-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.dataset.reactions;
        this.applyReactionsPreset(preset);
        this.saveState();
        this.syncSettingsToCloud();
        this.showToast('Reactions preset updated');
        this.backToMainSettings();
      });
    });
  }

  initCommentsSubview() {
    document.getElementById('settingAllowCommentsToggle')?.addEventListener('click', () => {
      const current = !(this.state.settings?.commentsEnabled === false);
      this.applyComments(!current);
      this.saveState();
      this.syncSettingsToCloud();
    });
  }

  /* ========================================================================
     4. More Options Drawer
     ======================================================================== */

  initMoreDrawer() {
    this.moreDrawer = document.getElementById('moreDrawer');
    document.getElementById('moreBtn')?.addEventListener('click', () => this.openMoreDrawer());
    document.getElementById('closeMoreDrawerBtn')?.addEventListener('click', () => this.closeMoreDrawer());
    this.moreDrawer?.addEventListener('click', (e) => {
      if (e.target === this.moreDrawer) this.closeMoreDrawer();
    });

    // Quick Action Tiles
    document.getElementById('moreQuickShareBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.openShareDrawer();
    });

    document.getElementById('moreQuickRemakeBtn')?.addEventListener('click', () => this.remakeBoard());
    document.getElementById('moreRemakeItem')?.addEventListener('click', () => this.remakeBoard());

    document.getElementById('moreQuickActivityBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.showToast('Recent activity: Board updated with Supabase Realtime');
    });

    document.getElementById('moreQuickSlideshowBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.openSlideshow();
    });

    document.getElementById('moreQuickSettingsBtn')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.openSettingsDrawer();
    });

    document.getElementById('moreFullscreenItem')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      this.toggleFullscreen();
    });

    document.getElementById('morePrintItem')?.addEventListener('click', () => {
      this.closeMoreDrawer();
      window.print();
    });

    document.getElementById('moreClearPostsItem')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all posts from this board?')) {
        this.state.sections.forEach(sec => sec.cards = []);
        this.saveState();
        this.renderBoard();
        this.closeMoreDrawer();
        this.showToast('All posts cleared');
      }
    });
  }

  openMoreDrawer() {
    this.closeAllDrawers();
    if (this.moreDrawer) this.moreDrawer.hidden = false;
  }

  closeMoreDrawer() {
    if (this.moreDrawer) this.moreDrawer.hidden = true;
  }

  closeAllDrawers() {
    if (this.shareDrawer) this.shareDrawer.hidden = true;
    if (this.settingsDrawer) this.settingsDrawer.hidden = true;
    if (this.moreDrawer) this.moreDrawer.hidden = true;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  remakeBoard() {
    if (confirm('Create a clean remake clone of this board?')) {
      const clonedState = JSON.parse(JSON.stringify(this.state));
      clonedState.boardTitle = (this.state.boardTitle || 'Board') + ' (Remake)';
      this.state = clonedState;
      this.saveState();
      this.renderBoard();
      this.closeMoreDrawer();
      this.showToast('Board remade successfully!');
    }
  }

  generateQrSvg(url) {
    return `<svg width="140" height="140" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="33" height="33" fill="white"/>
      <rect x="2" y="2" width="7" height="7" fill="black"/>
      <rect x="3" y="3" width="5" height="5" fill="white"/>
      <rect x="4" y="4" width="3" height="3" fill="black"/>
      <rect x="24" y="2" width="7" height="7" fill="black"/>
      <rect x="25" y="3" width="5" height="5" fill="white"/>
      <rect x="26" y="4" width="3" height="3" fill="black"/>
      <rect x="2" y="24" width="7" height="7" fill="black"/>
      <rect x="3" y="25" width="5" height="5" fill="white"/>
      <rect x="4" y="26" width="3" height="3" fill="black"/>
      <rect x="20" y="20" width="5" height="5" fill="black"/>
      <rect x="21" y="21" width="3" height="3" fill="white"/>
      <rect x="22" y="22" width="1" height="1" fill="black"/>
      <line x1="9" y1="5" x2="23" y2="5" stroke="black" stroke-dasharray="1,1"/>
      <line x1="5" y1="9" x2="5" y2="23" stroke="black" stroke-dasharray="1,1"/>
      <rect x="11" y="2" width="2" height="2" fill="black"/>
      <rect x="15" y="2" width="1" height="2" fill="black"/>
      <rect x="18" y="2" width="2" height="1" fill="black"/>
      <rect x="10" y="7" width="3" height="2" fill="black"/>
      <rect x="14" y="8" width="2" height="2" fill="black"/>
      <rect x="18" y="7" width="2" height="1" fill="black"/>
      <rect x="11" y="11" width="2" height="2" fill="black"/>
      <rect x="15" y="12" width="3" height="1" fill="black"/>
      <rect x="20" y="10" width="2" height="2" fill="black"/>
      <rect x="25" y="11" width="1" height="2" fill="black"/>
      <rect x="28" y="12" width="3" height="2" fill="black"/>
      <rect x="10" y="15" width="2" height="2" fill="black"/>
      <rect x="13" y="16" width="3" height="1" fill="black"/>
      <rect x="18" y="15" width="2" height="3" fill="black"/>
      <rect x="22" y="16" width="2" height="1" fill="black"/>
      <rect x="27" y="15" width="2" height="2" fill="black"/>
      <rect x="11" y="24" width="2" height="2" fill="black"/>
      <rect x="15" y="25" width="2" height="2" fill="black"/>
      <rect x="27" y="24" width="3" height="2" fill="black"/>
      <rect x="10" y="28" width="3" height="2" fill="black"/>
      <rect x="16" y="29" width="2" height="2" fill="black"/>
      <rect x="26" y="28" width="2" height="2" fill="black"/>
    </svg>`;
  }

  filterBoard(query) {
    const q = query.trim().toLowerCase();
    document.querySelectorAll('.padlet-card').forEach(cardEl => {
      if (q === '' || cardEl.innerText.toLowerCase().includes(q)) {
        cardEl.classList.remove('is-dimmed');
      } else {
        cardEl.classList.add('is-dimmed');
      }
    });
  }

  showToast(message) {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2200);
  }

  /* ========================================================================
     Supabase Cloud Backend & Realtime Integration
     ======================================================================== */

  initCloudBackendUI() {
    if (!this.backend) return;

    // Load initial values into modal inputs
    const savedUrl = localStorage.getItem('padles_supabase_url') || window.PADLES_SUPABASE_CONFIG?.url || '';
    const savedKey = localStorage.getItem('padles_supabase_anon_key') || window.PADLES_SUPABASE_CONFIG?.anonKey || '';
    const boardId = this.backend.activeBoardId || 'board-default-physics';

    if (this.supabaseUrlInput) this.supabaseUrlInput.value = savedUrl;
    if (this.supabaseKeyInput) this.supabaseKeyInput.value = savedKey;
    if (this.supabaseBoardIdInput) this.supabaseBoardIdInput.value = boardId;

    // Set initial status UI
    this.updateCloudStatusUI(this.backend.isConnected, this.backend.isConnected ? 'Supabase Live' : 'Local Mode');

    // Listen to backend status events
    this.backend.on('statusChange', ({ connected, message }) => {
      this.updateCloudStatusUI(connected, connected ? 'Supabase Live' : 'Local Mode');
      if (this.modalStatusLabel) {
        this.modalStatusLabel.textContent = `Status: ${message || (connected ? 'Connected to Supabase Cloud' : 'Local Storage mode (Offline)')}`;
      }
    });

    // Listen to presence events
    this.backend.on('presenceUpdated', (collaborators) => {
      this.renderCollaborators(collaborators);
    });

    // Listen to Realtime database changes
    this.backend.on('postChanged', (payload) => {
      this.handleRealtimePostChange(payload);
    });

    this.backend.on('sectionChanged', (payload) => {
      this.handleRealtimeSectionChange(payload);
    });

    // Header Cloud Button opens modal
    if (this.cloudSyncBtn) {
      this.cloudSyncBtn.addEventListener('click', () => {
        this.openCloudSettingsModal();
      });
    }

    // Modal Close button
    if (this.closeCloudSettingsBtn) {
      this.closeCloudSettingsBtn.addEventListener('click', () => {
        this.closeCloudSettingsModal();
      });
    }

    // Click backdrop to close
    if (this.cloudSettingsModal) {
      this.cloudSettingsModal.addEventListener('click', (e) => {
        if (e.target === this.cloudSettingsModal) {
          this.closeCloudSettingsModal();
        }
      });
    }

    // Toggle API Key visibility
    if (this.toggleKeyVisibilityBtn && this.supabaseKeyInput) {
      this.toggleKeyVisibilityBtn.addEventListener('click', () => {
        const isPw = this.supabaseKeyInput.type === 'password';
        this.supabaseKeyInput.type = isPw ? 'text' : 'password';
        this.toggleKeyVisibilityBtn.textContent = isPw ? '🔒' : '👁';
      });
    }

    // Test Connection Button
    if (this.testConnectionBtn) {
      this.testConnectionBtn.addEventListener('click', async () => {
        const url = (this.supabaseUrlInput?.value || '').trim();
        const key = (this.supabaseKeyInput?.value || '').trim();
        if (!url || !key) {
          this.showToast('Please enter both Supabase URL and Anon Key');
          return;
        }

        this.testConnectionBtn.textContent = 'Testing...';
        this.testConnectionBtn.disabled = true;

        const res = await this.backend.testConnection(url, key);
        this.testConnectionBtn.textContent = 'Test Connection';
        this.testConnectionBtn.disabled = false;

        if (res.success) {
          this.showToast('Connection verified successfully!');
          if (this.modalStatusLabel) this.modalStatusLabel.textContent = 'Status: Verified & Reachable!';
          if (this.modalStatusDot) {
            this.modalStatusDot.className = 'status-indicator-dot connected';
          }
        } else {
          this.showToast(`Test failed: ${res.error}`);
          if (this.modalStatusLabel) this.modalStatusLabel.textContent = `Status: Error - ${res.error}`;
          if (this.modalStatusDot) {
            this.modalStatusDot.className = 'status-indicator-dot disconnected';
          }
        }
      });
    }

    // Form Submit: Save & Connect
    if (this.cloudConfigForm) {
      this.cloudConfigForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = (this.supabaseUrlInput?.value || '').trim();
        const key = (this.supabaseKeyInput?.value || '').trim();
        const bId = (this.supabaseBoardIdInput?.value || 'board-default-physics').trim();

        if (!url || !key) {
          this.showToast('Please enter both Project URL and Anon Key');
          return;
        }

        this.backend.activeBoardId = bId;
        const connectBtn = document.getElementById('saveConnectBtn');
        if (connectBtn) connectBtn.disabled = true;

        this.showToast('Connecting to Supabase...');
        const res = await this.backend.connect(url, key, true);
        if (connectBtn) connectBtn.disabled = false;

        if (res.success) {
          this.closeCloudSettingsModal();
          this.showToast('Connected to Supabase! Syncing data...');
          await this.syncFromCloud();
        } else {
          this.showToast(`Connection failed: ${res.error}`);
        }
      });
    }

    // Disconnect Button
    if (this.disconnectCloudBtn) {
      this.disconnectCloudBtn.addEventListener('click', () => {
        this.backend.disconnect();
        if (this.supabaseUrlInput) this.supabaseUrlInput.value = '';
        if (this.supabaseKeyInput) this.supabaseKeyInput.value = '';
        this.updateCloudStatusUI(false, 'Local Mode');
        this.showToast('Disconnected. Running in local storage mode.');
      });
    }

    // Push Local to Cloud Button
    if (this.pushLocalToCloudBtn) {
      this.pushLocalToCloudBtn.addEventListener('click', async () => {
        if (!this.backend || !this.backend.isConnected) {
          this.showToast('Please connect to Supabase first.');
          return;
        }

        try {
          this.pushLocalToCloudBtn.textContent = 'Pushing...';
          this.pushLocalToCloudBtn.disabled = true;
          await this.backend.pushLocalStateToCloud(this.state, this.backend.activeBoardId);
          this.showToast('Local board state pushed to Supabase!');
        } catch (err) {
          this.showToast(`Push failed: ${err.message}`);
        } finally {
          this.pushLocalToCloudBtn.textContent = 'Push Local to Cloud ⬆';
          this.pushLocalToCloudBtn.disabled = false;
        }
      });
    }

    // Guide Accordion Toggle
    if (this.guideAccordionToggle && this.guideAccordionContent) {
      this.guideAccordionToggle.addEventListener('click', () => {
        const isHidden = this.guideAccordionContent.hidden;
        this.guideAccordionContent.hidden = !isHidden;
        const icon = document.getElementById('guideAccordionIcon');
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    }

    // Copy Schema Path Button
    if (this.copySchemaPathBtn) {
      this.copySchemaPathBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText('supabase/schema.sql');
        this.copySchemaPathBtn.textContent = 'Copied!';
        setTimeout(() => {
          if (this.copySchemaPathBtn) this.copySchemaPathBtn.textContent = 'Copy Path';
        }, 1500);
      });
    }
  }

  openCloudSettingsModal() {
    if (!this.cloudSettingsModal) return;
    this.cloudSettingsModal.hidden = false;
    if (this.backend) {
      if (this.backend.envConfig) {
        if (this.supabaseUrlInput && !this.supabaseUrlInput.value) this.supabaseUrlInput.value = this.backend.envConfig.url;
        if (this.supabaseKeyInput && !this.supabaseKeyInput.value) this.supabaseKeyInput.value = this.backend.envConfig.anonKey;
        if (this.supabaseBoardIdInput) this.supabaseBoardIdInput.value = this.backend.envConfig.boardId || this.backend.activeBoardId;
      }
      const isConn = this.backend.isConnected;
      if (this.modalStatusDot) {
        this.modalStatusDot.className = `status-indicator-dot ${isConn ? 'connected' : 'disconnected'}`;
      }
      if (this.modalStatusLabel) {
        const sourceText = this.backend.envSource ? ` (via ${this.backend.envSource})` : '';
        this.modalStatusLabel.textContent = `Status: ${isConn ? `Connected to Supabase Cloud${sourceText}` : 'Local Storage mode (Offline)'}`;
      }
    }
  }

  closeCloudSettingsModal() {
    if (this.cloudSettingsModal) {
      this.cloudSettingsModal.hidden = true;
    }
  }

  updateCloudStatusUI(connected, label = '') {
    if (this.cloudStatusDot) {
      this.cloudStatusDot.className = `status-indicator-dot ${connected ? 'connected' : 'disconnected'}`;
    }
    if (this.cloudStatusText) {
      this.cloudStatusText.textContent = label || (connected ? 'Supabase Live' : 'Local Mode');
    }
    if (this.modalStatusDot) {
      this.modalStatusDot.className = `status-indicator-dot ${connected ? 'connected' : 'disconnected'}`;
    }
    if (this.modalStatusLabel) {
      this.modalStatusLabel.textContent = `Status: ${connected ? 'Connected to Supabase Cloud' : 'Local Storage mode (Offline)'}`;
    }
  }

  renderCollaborators(collaborators) {
    if (!this.collaboratorsStrip) return;
    this.collaboratorsStrip.innerHTML = '';

    const seen = new Set();
    const unique = [];
    (collaborators || []).forEach(c => {
      if (c && c.id && !seen.has(c.id)) {
        seen.add(c.id);
        unique.push(c);
      }
    });

    unique.forEach(c => {
      const badge = document.createElement('div');
      badge.className = 'collaborator-avatar-badge';
      badge.title = `${c.name || 'Collaborator'} (Online)`;
      if (c.avatar) {
        badge.innerHTML = `<img src="${this.escapeHtml(c.avatar)}" alt="${this.escapeHtml(c.name || '')}" />`;
      } else {
        badge.textContent = (c.name || 'C').charAt(0).toUpperCase();
        badge.style.backgroundColor = c.color || '#ff1f6d';
      }
      this.collaboratorsStrip.appendChild(badge);
    });
  }

  async syncFromCloud() {
    if (!this.backend || !this.backend.isConnected) return;
    try {
      const cloudData = await this.backend.loadBoard(this.backend.activeBoardId);
      if (cloudData && cloudData.sections && cloudData.sections.length > 0) {
        const localDrafts = this.state.drafts;
        this.state = cloudData;
        this.state.drafts = localDrafts || [];
        this.saveState();
        this.renderBoard();
        this.showToast('Board synchronized with Supabase!');
      } else if (cloudData && (!cloudData.sections || cloudData.sections.length === 0)) {
        // Cloud board exists but is empty, push local state
        await this.backend.pushLocalStateToCloud(this.state, this.backend.activeBoardId);
        this.showToast('Cloud board initialized from local data!');
      }
    } catch (err) {
      console.warn('Error during cloud sync:', err);
    }
  }

  handleRealtimePostChange(payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    if (eventType === 'INSERT') {
      const existing = this.findCardById(newRecord.id);
      if (existing) return;

      const targetSection = this.state.sections.find(s => s.id === newRecord.section_id);
      if (targetSection) {
        const card = {
          id: newRecord.id,
          title: newRecord.title || '',
          pinned: !!newRecord.pinned,
          type: newRecord.type || 'text',
          color: newRecord.color || 'white',
          content: newRecord.content || (newRecord.body ? { body: newRecord.body } : null),
          attachment: newRecord.attachment || null,
          customFieldValues: newRecord.custom_field_values || {},
          reactions: newRecord.reactions_count || 0,
          hasReacted: false,
          rank: newRecord.rank || 1000.0,
          comments: []
        };
        targetSection.cards.push(card);
        this.saveState();
        this.renderBoard();
        this.showToast('New post received from collaborator!');
      }
    } else if (eventType === 'UPDATE') {
      const data = this.findCardAndSection(newRecord.id);
      if (!data) return;
      const { card, section } = data;

      card.title = newRecord.title || '';
      card.color = newRecord.color || 'white';
      card.type = newRecord.type || 'text';
      card.content = newRecord.content || (newRecord.body ? { body: newRecord.body } : null);
      card.attachment = newRecord.attachment || null;
      card.customFieldValues = newRecord.custom_field_values || {};
      card.pinned = !!newRecord.pinned;
      card.reactions = newRecord.reactions_count || 0;
      if (typeof newRecord.rank === 'number') card.rank = newRecord.rank;

      if (newRecord.section_id && newRecord.section_id !== section.id) {
        section.cards = section.cards.filter(c => c.id !== card.id);
        const newSec = this.state.sections.find(s => s.id === newRecord.section_id);
        if (newSec) newSec.cards.push(card);
      }

      this.saveState();
      this.renderBoard();
    } else if (eventType === 'DELETE') {
      const data = this.findCardAndSection(oldRecord.id);
      if (!data) return;
      data.section.cards = data.section.cards.filter(c => c.id !== oldRecord.id);
      this.saveState();
      this.renderBoard();
    }
  }

  handleRealtimeSectionChange(payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    if (eventType === 'INSERT') {
      if (this.state.sections.some(s => s.id === newRecord.id)) return;
      this.state.sections.push({
        id: newRecord.id,
        title: newRecord.title,
        rank: newRecord.rank || 1000.0,
        isDefault: !!newRecord.is_default,
        cards: []
      });
      this.saveState();
      this.renderBoard();
      this.updateSectionSelectorUI();
    } else if (eventType === 'UPDATE') {
      const sec = this.state.sections.find(s => s.id === newRecord.id);
      if (sec) {
        sec.title = newRecord.title;
        if (typeof newRecord.rank === 'number') sec.rank = newRecord.rank;
        this.saveState();
        this.renderBoard();
        this.updateSectionSelectorUI();
      }
    } else if (eventType === 'DELETE') {
      this.state.sections = this.state.sections.filter(s => s.id !== oldRecord.id);
      this.saveState();
      this.renderBoard();
      this.updateSectionSelectorUI();
    }
  }

  /* ========================================================================
     Authentic Padlet Auth System (Modal Dialog + Standalone View)
     ======================================================================== */

  initAuthSystem() {
    this.authMode = 'login'; // 'login' | 'signup'

    // Update UI based on initial backend user
    if (this.backend && this.backend.currentUser) {
      this.updateAuthUI(this.backend.currentUser);
    }

    // Listen for auth state transitions
    if (this.backend) {
      this.backend.on('authStateChange', ({ user }) => {
        this.updateAuthUI(user);
      });
    }

    // Topbar Buttons
    if (this.topbarLoginBtn) {
      this.topbarLoginBtn.addEventListener('click', () => this.openAuthModal('login'));
    }
    if (this.topbarSignupBtn) {
      this.topbarSignupBtn.addEventListener('click', () => this.openAuthModal('signup'));
    }

    // Avatar Button
    if (this.guestAvatarAnchor) {
      this.guestAvatarAnchor.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.backend && this.backend.isAuthenticated()) {
          if (this.userAccountDropdown) {
            this.userAccountDropdown.style.left = 'auto';
            this.userAccountDropdown.style.right = '16px';
            this.userAccountDropdown.style.top = '54px';
          }
          this.toggleUserAccountDropdown();
        } else {
          this.openAuthModal('login');
        }
      });
    }

    // Account Dropdown Buttons
    if (this.accountMenuProfileBtn) {
      this.accountMenuProfileBtn.addEventListener('click', () => {
        this.toggleUserAccountDropdown(false);
        const newName = prompt('Enter display name:', this.backend.currentUser?.name || '');
        if (newName && newName.trim()) {
          this.backend.updateProfile({ full_name: newName.trim() });
          this.showToast('Profile updated!');
        }
      });
    }

    if (this.accountMenuCloudBtn) {
      this.accountMenuCloudBtn.addEventListener('click', () => {
        this.toggleUserAccountDropdown(false);
        if (this.cloudSettingsModal) this.cloudSettingsModal.hidden = false;
      });
    }

    if (this.accountMenuLogoutBtn) {
      this.accountMenuLogoutBtn.addEventListener('click', async () => {
        this.toggleUserAccountDropdown(false);
        if (this.backend) await this.backend.signOut();
        this.showToast('Logged out successfully');
      });
    }

    // Close account dropdown on outside click
    document.addEventListener('click', (e) => {
      if (this.userAccountDropdown && !this.userAccountDropdown.hidden) {
        if (!this.userAccountDropdown.contains(e.target) && e.target !== this.guestAvatarAnchor) {
          this.userAccountDropdown.hidden = true;
        }
      }
    });

    // In-App Modal controls
    const closeAuthBtn = document.getElementById('closeAuthModalBtn');
    if (closeAuthBtn) closeAuthBtn.addEventListener('click', () => this.closeAuthModal());
    if (this.authModal) {
      this.authModal.addEventListener('click', (e) => {
        if (e.target === this.authModal) this.closeAuthModal();
      });
    }

    const authModalSwitchBtn = document.getElementById('authModalSwitchBtn');
    if (authModalSwitchBtn) {
      authModalSwitchBtn.addEventListener('click', () => {
        this.setAuthMode(this.authMode === 'login' ? 'signup' : 'login', 'modal');
      });
    }

    // Modal Form Inputs & Submit
    this.bindAuthForm('modal');
    this.bindAuthForm('standalone');

    // Standalone View controls
    const authStandaloneBackBtn = document.getElementById('authStandaloneBackBtn');
    if (authStandaloneBackBtn) {
      authStandaloneBackBtn.addEventListener('click', () => this.closeAuthStandalone());
    }

    const authStandaloneSwitchBtn = document.getElementById('authStandaloneSwitchBtn');
    if (authStandaloneSwitchBtn) {
      authStandaloneSwitchBtn.addEventListener('click', () => {
        this.setAuthMode(this.authMode === 'login' ? 'signup' : 'login', 'standalone');
      });
    }

    // Check URL parameters for standalone auth
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam === 'login' || viewParam === 'signup' || window.location.hash === '#login' || window.location.hash === '#signup') {
      this.openAuthStandalone(viewParam === 'signup' || window.location.hash === '#signup' ? 'signup' : 'login');
    }
  }

  updateAuthUI(user) {
    const isAuthed = this.backend && this.backend.isAuthenticated();
    if (this.topbarLoginBtn) {
      this.topbarLoginBtn.style.display = isAuthed ? 'none' : 'inline-flex';
    }
    if (this.topbarSignupBtn) {
      this.topbarSignupBtn.style.display = isAuthed ? 'none' : 'inline-flex';
    }
    if (this.topbarAvatarImg && user) {
      this.topbarAvatarImg.src = user.avatar || 'https://padlet.net/identicons/6461510121x24.png';
      this.topbarAvatarImg.alt = user.name || 'User';
      if (this.guestAvatarAnchor) {
        this.guestAvatarAnchor.title = user.name || 'Account';
      }
    }
    if (this.accountDropdownAvatar && user) {
      this.accountDropdownAvatar.src = user.avatar || 'https://padlet.net/identicons/6461510121x24.png';
    }
    if (this.accountDropdownName && user) {
      this.accountDropdownName.textContent = user.name || 'Salman Madani';
    }
    if (this.accountDropdownEmail && user) {
      this.accountDropdownEmail.textContent = user.email || 'salman@padles.dev';
    }
  }

  toggleUserAccountDropdown(force) {
    if (!this.userAccountDropdown) return;
    const shouldShow = typeof force === 'boolean' ? force : this.userAccountDropdown.hidden;
    this.userAccountDropdown.hidden = !shouldShow;
  }

  setAuthMode(mode, target = 'modal') {
    this.authMode = mode;
    const isLogin = mode === 'login';
    const prefix = target === 'modal' ? 'authModal' : 'authStandalone';

    const switchText = document.getElementById(`${prefix}SwitchText`);
    const switchBtn = document.getElementById(`${prefix}SwitchBtn`);
    const heading = document.getElementById(`${prefix}Heading`);
    const subtitle = document.getElementById(`${prefix}Subtitle`);
    const googleLabel = document.getElementById(target === 'modal' ? 'ssoGoogleModalLabel' : 'ssoGoogleStandaloneLabel');
    const msLabel = document.getElementById(target === 'modal' ? 'ssoMsModalLabel' : 'ssoMsStandaloneLabel');
    const appleLabel = document.getElementById(target === 'modal' ? 'ssoAppleModalLabel' : 'ssoAppleStandaloneLabel');
    const dividerCaption = document.getElementById(`${prefix}DividerCaption`);
    const nameGroup = document.getElementById(`${prefix}NameGroup`);
    const termsNotice = document.getElementById(`${prefix}TermsNotice`);
    const workspaceNotice = document.getElementById(`${prefix}WorkspaceNotice`);
    const passwordGroup = document.getElementById(`${prefix}PasswordGroup`);
    const submitBtn = document.getElementById(`${prefix}SubmitBtn`);
    const errorBadge = document.getElementById(`${prefix}ErrorBadge`);

    if (switchText) switchText.textContent = isLogin ? 'Not a member?' : 'Already a member?';
    if (switchBtn) switchBtn.textContent = isLogin ? 'Sign up' : 'Log in';
    if (heading) heading.textContent = isLogin ? 'Log in' : 'Sign up';
    if (subtitle) subtitle.textContent = isLogin ? 'Welcome back to where you belong' : 'You belong here';
    if (googleLabel) googleLabel.textContent = isLogin ? 'Log in with Google' : 'Sign up with Google';
    if (msLabel) msLabel.textContent = isLogin ? 'Log in with Microsoft' : 'Sign up with Microsoft';
    if (appleLabel) appleLabel.textContent = isLogin ? 'Log in with Apple' : 'Sign up with Apple';
    if (dividerCaption) dividerCaption.textContent = isLogin ? 'Or, log in with email/username' : 'Or, sign up with email';
    if (nameGroup) nameGroup.style.display = isLogin ? 'none' : 'flex';
    if (termsNotice) termsNotice.style.display = isLogin ? 'none' : 'block';
    if (workspaceNotice) workspaceNotice.style.display = isLogin ? 'block' : 'none';
    if (errorBadge) errorBadge.style.display = 'none';

    // Reset password group on mode switch
    if (passwordGroup) passwordGroup.style.display = 'none';
    if (submitBtn) {
      submitBtn.textContent = 'Continue';
    }
  }

  openAuthModal(mode = 'login') {
    if (!this.authModal) return;
    this.setAuthMode(mode, 'modal');
    this.authModal.hidden = false;
    const emailInput = document.getElementById('authModalEmailInput');
    if (emailInput) {
      emailInput.focus();
    }
  }

  closeAuthModal() {
    if (!this.authModal) return;
    this.authModal.hidden = true;
  }

  openAuthStandalone(mode = 'login') {
    if (!this.authStandaloneView) return;
    this.setAuthMode(mode, 'standalone');
    this.authStandaloneView.hidden = false;
    const emailInput = document.getElementById('authStandaloneEmailInput');
    if (emailInput) {
      emailInput.focus();
    }
  }

  closeAuthStandalone() {
    if (!this.authStandaloneView) return;
    this.authStandaloneView.hidden = true;
    const url = new URL(window.location);
    url.searchParams.delete('view');
    window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''));
  }

  bindAuthForm(target) {
    const prefix = target === 'modal' ? 'authModal' : 'authStandalone';
    const emailInput = document.getElementById(`${prefix}EmailInput`);
    const emailGroup = document.getElementById(`${prefix}EmailGroup`);
    const passwordInput = document.getElementById(`${prefix}PasswordInput`);
    const passwordGroup = document.getElementById(`${prefix}PasswordGroup`);
    const nameInput = document.getElementById(`${prefix}NameInput`);
    const submitBtn = document.getElementById(`${prefix}SubmitBtn`);
    const errorBadge = document.getElementById(`${prefix}ErrorBadge`);
    const togglePwBtn = document.getElementById(`${prefix}TogglePwBtn`);
    const googleBtn = document.getElementById(target === 'modal' ? 'ssoGoogleModalBtn' : 'ssoGoogleStandaloneBtn');
    const msBtn = document.getElementById(target === 'modal' ? 'ssoMsModalBtn' : 'ssoMsStandaloneBtn');
    const appleBtn = document.getElementById(target === 'modal' ? 'ssoAppleModalBtn' : 'ssoAppleStandaloneBtn');

    if (!emailInput || !submitBtn) return;

    // Enable/disable submit button on input
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim();
      submitBtn.disabled = !val;
      if (emailGroup) emailGroup.classList.remove('has-error');
      if (errorBadge) errorBadge.style.display = 'none';
    });

    // Password visibility toggle
    if (togglePwBtn && passwordInput) {
      togglePwBtn.addEventListener('click', () => {
        const isPw = passwordInput.type === 'password';
        passwordInput.type = isPw ? 'text' : 'password';
      });
    }

    // SSO Buttons handler
    const handleSso = (provider) => {
      const demoEmail = `${provider.toLowerCase()}user@gmail.com`;
      this.handleAuthSubmission(demoEmail, 'demo123456', `${provider} User`, target);
    };

    if (googleBtn) googleBtn.addEventListener('click', () => handleSso('Google'));
    if (msBtn) msBtn.addEventListener('click', () => handleSso('Microsoft'));
    if (appleBtn) appleBtn.addEventListener('click', () => handleSso('Apple'));

    // Form submission
    const handleContinue = () => {
      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        if (emailGroup) emailGroup.classList.add('has-error');
        if (errorBadge) {
          errorBadge.textContent = 'Invalid email';
          errorBadge.style.display = 'block';
        }
        return;
      }

      // If password field is still hidden, reveal it!
      if (passwordGroup && passwordGroup.style.display === 'none') {
        passwordGroup.style.display = 'flex';
        passwordInput.focus();
        submitBtn.textContent = this.authMode === 'login' ? 'Log in' : 'Create account';
        return;
      }

      const password = passwordInput ? passwordInput.value : '';
      if (!password || password.length < 6) {
        if (passwordGroup) passwordGroup.classList.add('has-error');
        if (errorBadge) {
          errorBadge.textContent = 'Password must be 6+ characters';
          errorBadge.style.display = 'block';
        }
        return;
      }

      const name = nameInput ? nameInput.value.trim() : '';
      this.handleAuthSubmission(email, password, name, target);
    };

    submitBtn.addEventListener('click', handleContinue);

    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleContinue();
      }
    });

    if (passwordInput) {
      passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleContinue();
        }
      });
    }
  }

  async handleAuthSubmission(email, password, fullName, target) {
    const prefix = target === 'modal' ? 'authModal' : 'authStandalone';
    const emailGroup = document.getElementById(`${prefix}EmailGroup`);
    const errorBadge = document.getElementById(`${prefix}ErrorBadge`);
    const submitBtn = document.getElementById(`${prefix}SubmitBtn`);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Connecting...';
    }

    try {
      let result;
      if (this.authMode === 'login') {
        result = await this.backend.signIn(email, password);
      } else {
        result = await this.backend.signUp(email, password, fullName);
      }

      if (!result.success) {
        if (emailGroup) emailGroup.classList.add('has-error');
        if (errorBadge) {
          errorBadge.textContent = result.error || 'User not found';
          errorBadge.style.display = 'block';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = this.authMode === 'login' ? 'Log in' : 'Create account';
        }
        return;
      }

      // Success!
      this.showToast(`Welcome back, ${this.backend.currentUser.name}!`);
      if (target === 'modal') {
        this.closeAuthModal();
      } else {
        this.closeAuthStandalone();
      }
    } catch (err) {
      if (emailGroup) emailGroup.classList.add('has-error');
      if (errorBadge) {
        errorBadge.textContent = err.message || 'Error authenticating';
        errorBadge.style.display = 'block';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = this.authMode === 'login' ? 'Log in' : 'Create account';
      }
    }
  }

  /* ========================================================================
     Padles Dashboard Shell & Navigation System (Phase 3 1:1 Parity)
     ======================================================================== */

  initDashboard() {
    // 1. Sync User Profile in Sidebar & Topbar
    if (this.backend && this.backend.currentUser) {
      this.updateDashboardUser(this.backend.currentUser);
    }
    if (this.backend) {
      this.backend.on('authStateChange', ({ user }) => {
        this.updateDashboardUser(user);
      });
    }

    // 2. Logo click on board topbar -> Opens Dashboard
    if (this.topbarLogoLink) {
      this.topbarLogoLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showDashboard('recents');
      });
    }

    // 3. Profile button & Avatar button -> Toggle User Account Dropdown
    if (this.sidebarProfileBtn) {
      this.sidebarProfileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.userAccountDropdown) {
          this.userAccountDropdown.style.left = '12px';
          this.userAccountDropdown.style.right = 'auto';
          this.userAccountDropdown.style.top = '72px';
        }
        this.toggleUserAccountDropdown();
      });
    }
    if (this.dashboardAvatarBtn) {
      this.dashboardAvatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.userAccountDropdown) {
          this.userAccountDropdown.style.left = 'auto';
          this.userAccountDropdown.style.right = '16px';
          this.userAccountDropdown.style.top = '54px';
        }
        this.toggleUserAccountDropdown();
      });
    }

    // 4. Sidebar Nav Items Click
    if (this.sidebarNavItems && this.sidebarNavItems.length) {
      this.sidebarNavItems.forEach(item => {
        item.addEventListener('click', () => {
          const tab = item.getAttribute('data-tab') || 'recents';
          this.setDashboardTab(tab);
        });
      });
    }

    // 5. Search Bar Input
    if (this.dashboardSearchInput) {
      let debounceTimer = null;
      this.dashboardSearchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.dashboardSearchQuery = e.target.value.trim();
          this.renderDashboardBoards();
        }, 150);
      });
    }

    // Keyboard shortcut "/" to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        if (this.dashboardView && !this.dashboardView.hidden) {
          e.preventDefault();
          this.dashboardSearchInput?.focus();
        }
      }
    });

    // 6. Sort Select
    if (this.dashboardSortSelect) {
      this.dashboardSortSelect.addEventListener('change', (e) => {
        this.dashboardSort = e.target.value;
        this.renderDashboardBoards();
      });
    }

    // 7. Make a padlet buttons -> Opens Authentic Creation Modal
    if (this.sidebarMakePadletBtn) {
      this.sidebarMakePadletBtn.addEventListener('click', () => this.openMakePadletModal());
    }
    if (this.dashboardEmptyMakeBtn) {
      this.dashboardEmptyMakeBtn.addEventListener('click', () => this.openMakePadletModal());
    }

    // Modal format choice cards selection
    if (this.formatChoiceCards) {
      this.formatChoiceCards.forEach(card => {
        card.addEventListener('click', () => {
          this.formatChoiceCards.forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          this.selectedCreationFormat = card.getAttribute('data-format') || 'shelf';
        });
      });
    }

    // Modal wallpaper swatches selection
    if (this.wallpaperSwatchBtns) {
      this.wallpaperSwatchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.wallpaperSwatchBtns.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          this.selectedCreationWallpaper = btn.getAttribute('data-wallpaper') || 'aurora';
        });
      });
    }

    // Modal Close & Cancel
    if (this.closeMakePadletModalBtn) {
      this.closeMakePadletModalBtn.addEventListener('click', () => this.closeMakePadletModal());
    }
    if (this.cancelMakePadletBtn) {
      this.cancelMakePadletBtn.addEventListener('click', () => this.closeMakePadletModal());
    }
    if (this.makePadletModal) {
      this.makePadletModal.addEventListener('click', (e) => {
        if (e.target === this.makePadletModal) this.closeMakePadletModal();
      });
    }

    // Modal Submit Creation
    if (this.submitMakePadletBtn) {
      this.submitMakePadletBtn.addEventListener('click', async () => {
        const title = this.makePadletTitleInput?.value.trim() || 'My Brilliant Padlet';
        const newBoard = await this.backend.createBoard({
          title,
          format: this.selectedCreationFormat || 'shelf',
          wallpaper: this.selectedCreationWallpaper || 'aurora'
        });
        this.closeMakePadletModal();
        this.openBoard(newBoard.id);
        this.showToast(`Created "${newBoard.title}"!`);
      });
    }

    // 8. Join & Gallery buttons
    if (this.dashboardJoinBtn) {
      this.dashboardJoinBtn.addEventListener('click', () => {
        const urlOrCode = prompt('Enter Padlet URL or code to join:');
        if (urlOrCode && urlOrCode.trim()) {
          this.showToast('Joining padlet...');
          this.openBoard('board-default-physics');
        }
      });
    }
    if (this.dashboardGalleryBtn) {
      this.dashboardGalleryBtn.addEventListener('click', () => {
        this.setDashboardTab('shared');
      });
    }

    // 9. Check URL on page load for ?view=dashboard or ?board=<id>
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    const tabParam = urlParams.get('tab') || 'recents';
    if (viewParam === 'dashboard') {
      this.showDashboard(tabParam);
    } else {
      const boardParam = urlParams.get('board');
      if (boardParam && boardParam !== 'board-default-physics') {
        this.openBoard(boardParam);
      }
    }
  }

  openMakePadletModal() {
    if (!this.makePadletModal) return;
    this.makePadletModal.hidden = false;
    this.selectedCreationFormat = 'shelf';
    this.selectedCreationWallpaper = 'aurora';

    if (this.formatChoiceCards) {
      this.formatChoiceCards.forEach(c => {
        c.classList.toggle('selected', c.getAttribute('data-format') === 'shelf');
      });
    }
    if (this.wallpaperSwatchBtns) {
      this.wallpaperSwatchBtns.forEach(b => {
        b.classList.toggle('selected', b.getAttribute('data-wallpaper') === 'aurora');
      });
    }
    if (this.makePadletTitleInput) {
      this.makePadletTitleInput.value = 'My Brilliant Padlet';
      setTimeout(() => {
        this.makePadletTitleInput.focus();
        this.makePadletTitleInput.select();
      }, 50);
    }
  }

  closeMakePadletModal() {
    if (this.makePadletModal) this.makePadletModal.hidden = true;
  }

  getInitialBoardState(boardId) {
    if (boardId === 'board-burrito-map') {
      return {
        board: {
          title: 'San Francisco Burrito Map',
          description: 'The quest for the ultimate mission-style burrito, carnitas, and salsas across SF.',
          wallpaper: 'sunset'
        },
        sections: [
          {
            id: 'sec-mission',
            title: 'Mission District',
            cards: [
              {
                id: 'card-burrito-1',
                subject: 'La Taqueria: The Legendary Dorado Style',
                title: 'La Taqueria: The Legendary Dorado Style',
                body: '<p>No rice, all flavor. Ordering "dorado style" gets the tortilla crisped to golden perfection on the flat top.</p>',
                color: 'default',
                pinned: false,
                reactions: 12,
                hasReacted: false,
                attachment: {
                  type: 'image',
                  url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
                  title: 'Golden Dorado Burrito'
                }
              },
              {
                id: 'card-burrito-2',
                subject: 'El Farolito: Midnight Carne Asada King',
                title: 'El Farolito: Midnight Carne Asada King',
                body: '<p>Massive portions, juicy steak, and open late until 2 AM. The quintessential SF post-concert sanctuary.</p>',
                color: 'blue',
                pinned: false,
                reactions: 24,
                hasReacted: false,
                attachment: null
              }
            ]
          },
          {
            id: 'sec-haight',
            title: 'Haight-Ashbury',
            cards: [
              {
                id: 'card-burrito-3',
                subject: 'Street Taco: Crispy Pork Carnitas',
                title: 'Street Taco: Crispy Pork Carnitas',
                body: '<p>Fresh handmade corn tortillas and slow-braised carnitas with pickled red onions.</p>',
                color: 'default',
                pinned: false,
                reactions: 8,
                hasReacted: false,
                attachment: null
              }
            ]
          },
          {
            id: 'sec-northbeach',
            title: 'North Beach & Chinatown',
            cards: []
          },
          {
            id: 'sec-soma',
            title: 'SoMa & Financial District',
            cards: []
          }
        ]
      };
    }

    if (boardId === 'board-travel-itinerary') {
      return {
        board: {
          title: 'Travel Itinerary: Tokyo & Kyoto',
          description: '10-day adventure across Tokyo skyline, Mount Fuji, Kyoto shrines, and Osaka street food.',
          wallpaper: 'oceanic'
        },
        sections: [
          {
            id: 'sec-tokyo',
            title: 'Tokyo: Shinjuku & Shibuya',
            cards: [
              {
                id: 'card-tokyo-1',
                subject: 'Day 1: Shibuya Crossing & Meiji Shrine',
                title: 'Day 1: Shibuya Crossing & Meiji Shrine',
                body: '<p>Morning walk through the serene cedar forest of Meiji Jingu, followed by afternoon coffee overlooking the Shibuya scramble.</p>',
                color: 'blue',
                pinned: false,
                reactions: 15,
                hasReacted: false,
                attachment: null
              }
            ]
          },
          {
            id: 'sec-kyoto',
            title: 'Kyoto: Arashiyama & Fushimi Inari',
            cards: [
              {
                id: 'card-kyoto-1',
                subject: 'Day 4: Early Morning Torii Gates',
                title: 'Day 4: Early Morning Torii Gates',
                body: '<p>Beat the crowd at Fushimi Inari by arriving at 6:30 AM. 10,000 vermilion torii gates winding up sacred Mount Inari.</p>',
                color: 'default',
                pinned: false,
                reactions: 19,
                hasReacted: false,
                attachment: null
              }
            ]
          },
          {
            id: 'sec-osaka',
            title: 'Osaka: Dotonbori Feast',
            cards: []
          },
          {
            id: 'sec-packing',
            title: 'Packing & Rail Passes',
            cards: []
          }
        ]
      };
    }

    if (boardId === 'board-growth-brainstorm') {
      return {
        board: {
          title: 'Growth Brainstorming Session',
          description: 'Experiments, user retention loops, viral mechanisms, and quick wins.',
          wallpaper: 'charcoal'
        },
        sections: [
          {
            id: 'sec-ideas',
            title: 'Ideation & Hypotheses',
            cards: [
              {
                id: 'card-growth-1',
                subject: '1-Click Board Templates Sharing',
                title: '1-Click Board Templates Sharing',
                body: '<p>Allow teachers and creators to export an entire board structure with 1-click clone link.</p>',
                color: 'default',
                pinned: false,
                reactions: 7,
                hasReacted: false,
                attachment: null
              }
            ]
          },
          {
            id: 'sec-testing',
            title: 'In Progress Testing',
            cards: []
          },
          {
            id: 'sec-validated',
            title: 'Validated Winners',
            cards: [
              {
                id: 'card-growth-2',
                subject: 'Instant Guest Post Composer',
                title: 'Instant Guest Post Composer',
                body: '<p>Lowered friction for student contributions resulted in 3.4x higher post creation velocity.</p>',
                color: 'default',
                pinned: false,
                reactions: 22,
                hasReacted: false,
                attachment: null
              }
            ]
          },
          {
            id: 'sec-lessons',
            title: 'Lessons & Killed',
            cards: []
          }
        ]
      };
    }

    const boards = this.backend.getLocalBoards();
    const boardMeta = boards.find(b => b.id === boardId);
    return {
      board: {
        title: boardMeta?.title || 'New Padlet',
        description: '',
        wallpaper: boardMeta?.wallpaper || 'aurora'
      },
      sections: [
        { id: `sec-${Date.now()}`, title: 'Section 1', cards: [] }
      ]
    };
  }

  updateDashboardUser(user) {
    if (!user) return;
    if (this.sidebarAvatarImg) this.sidebarAvatarImg.src = user.avatar || 'https://padlet.net/identicons/6461510121x24.png';
    if (this.dashboardAvatarImg) this.dashboardAvatarImg.src = user.avatar || 'https://padlet.net/identicons/6461510121x24.png';
    if (this.sidebarUserName) this.sidebarUserName.textContent = user.name || 'Salman Madani';
  }

  showDashboard(tab = 'recents') {
    if (!this.dashboardView) return;
    this.dashboardView.hidden = false;
    if (this.surfaceTopbar) this.surfaceTopbar.style.display = 'none';
    if (this.surfaceHeaderBlock) this.surfaceHeaderBlock.style.display = 'none';
    if (this.boardContainer) this.boardContainer.style.display = 'none';
    if (this.floatingPostContainer) this.floatingPostContainer.style.display = 'none';

    this.setDashboardTab(tab);
    history.pushState(null, '', '?view=dashboard' + (tab !== 'recents' ? '&tab=' + tab : ''));
  }

  openBoard(boardId) {
    if (this.dashboardView) this.dashboardView.hidden = true;
    if (this.surfaceTopbar) this.surfaceTopbar.style.display = '';
    if (this.surfaceHeaderBlock) this.surfaceHeaderBlock.style.display = '';
    if (this.boardContainer) this.boardContainer.style.display = '';
    if (this.floatingPostContainer) this.floatingPostContainer.style.display = '';

    // Save previous active board
    if (this.currentBoardId && this.state) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      } catch (_) {}
    }

    this.currentBoardId = boardId;
    this.storageKey = boardId === 'board-default-physics' ? 'padles_board_exact_v1' : (`padles_board_${boardId}`);

    let loadedState = null;
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) loadedState = JSON.parse(stored);
    } catch (_) {}

    if (!loadedState) {
      loadedState = this.getInitialBoardState(boardId);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(loadedState));
      } catch (_) {}
    }

    this.state = loadedState;

    // Apply Wallpaper Theme
    const wallpaper = this.state.board?.wallpaper || 'aurora';
    document.body.classList.remove('aurora-theme', 'oceanic-theme', 'sunset-theme', 'charcoal-theme');
    if (wallpaper === 'oceanic') {
      document.body.classList.add('oceanic-theme');
    } else if (wallpaper === 'sunset') {
      document.body.classList.add('sunset-theme');
    } else if (wallpaper === 'charcoal') {
      document.body.classList.add('charcoal-theme');
    } else {
      document.body.classList.add('aurora-theme');
    }

    // Update Title and Re-render Board
    if (this.boardTitle && this.state.board?.title) {
      this.boardTitle.textContent = this.state.board.title;
    }
    document.title = `${this.state.board?.title || 'Board'} — Padles`;
    this.renderBoard();

    // Update URL
    const url = boardId === 'board-default-physics' ? '/' : `?board=${boardId}`;
    history.pushState(null, '', url);
    this.showToast(`Loaded "${this.state.board?.title || 'Board'}"`);
  }

  setDashboardTab(tab) {
    this.dashboardTab = tab;

    if (this.sidebarNavItems) {
      this.sidebarNavItems.forEach(item => {
        if (item.getAttribute('data-tab') === tab) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    const titles = {
      recents: 'Recents',
      bookmarks: 'Bookmarks',
      shared: 'Shared with me',
      trash: 'Trash'
    };
    if (this.dashboardTabTitle) {
      this.dashboardTabTitle.textContent = titles[tab] || 'Recents';
    }

    this.renderDashboardBoards();
  }

  async renderDashboardBoards() {
    if (!this.dashboardBoardsGrid) return;
    const boards = await this.backend.listBoards(this.dashboardTab, this.dashboardSearchQuery);

    if (this.dashboardSort === 'title_az') {
      boards.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (this.dashboardSort === 'last_modified') {
      boards.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    } else {
      boards.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    }

    if (boards.length === 0) {
      this.dashboardBoardsGrid.innerHTML = '';
      if (this.dashboardEmptyState) {
        this.dashboardEmptyState.style.display = 'flex';
        const emptyData = {
          recents: { title: 'No padlets found', desc: 'Create your first padlet or join an existing one to get started.' },
          bookmarks: { title: 'No bookmarks yet', desc: 'Star padlets to quickly access your favorite boards here.' },
          shared: { title: 'Nothing shared with you', desc: 'Boards shared with you by other padlers will appear here.' },
          trash: { title: 'Trash is empty', desc: 'Deleted padlets will appear here before being permanently removed.' }
        };
        const activeEmpty = emptyData[this.dashboardTab] || emptyData.recents;
        if (this.dashboardEmptyTitle) this.dashboardEmptyTitle.textContent = activeEmpty.title;
        if (this.dashboardEmptyDesc) this.dashboardEmptyDesc.textContent = activeEmpty.desc;
      }
      return;
    }

    if (this.dashboardEmptyState) this.dashboardEmptyState.style.display = 'none';

    this.dashboardBoardsGrid.innerHTML = boards.map(b => {
      const thumbUrl = b.thumbnail_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80';
      const timeAgo = this.formatTimeAgo(b.updated_at);
      return `
        <div class="wall-card-button" data-board-id="${b.id}" tabindex="0" role="button" aria-label="${this.escapeHtml(b.title)}">
          <div class="wall-card-thumbnail-wrap">
            <img class="wall-card-thumbnail-img" src="${thumbUrl}" alt="${this.escapeHtml(b.title)}" loading="lazy" />
            <div class="wall-card-thumbnail-gradient"></div>
            ${b.is_bookmarked ? `
              <div class="wall-card-bookmark-badge" title="Bookmarked">
                <svg viewBox="0 0 32 32" width="14" height="14" fill="currentColor">
                  <path d="M7.333 4C6.23 4 5.333 4.897 5.333 6v22.667a1.333 1.333 0 0 0 2.06 1.116L16 23.774l8.607 6.009a1.333 1.333 0 0 0 2.06-1.116V6c0-1.103-.897-2-2-2z"/>
                </svg>
              </div>
            ` : ''}
            <button type="button" class="wall-card-menu-btn" data-board-id="${b.id}" title="Board options" aria-label="Board options">
              <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                <circle cx="7" cy="16" r="3"/><circle cx="16" cy="16" r="3"/><circle cx="25" cy="16" r="3"/>
              </svg>
            </button>
          </div>
          <div class="wall-card-info">
            <h3 class="wall-card-title">${this.escapeHtml(b.title)}</h3>
            <div class="wall-card-meta">
              <span>${this.escapeHtml(b.author || 'Salman Madani')}</span>
              <span class="wall-card-meta-dot">•</span>
              <time>${timeAgo}</time>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Click Handlers to Cards
    const cardEls = this.dashboardBoardsGrid.querySelectorAll('.wall-card-button');
    cardEls.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.wall-card-menu-btn')) return;
        const boardId = card.getAttribute('data-board-id');
        if (boardId) this.openBoard(boardId);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const boardId = card.getAttribute('data-board-id');
          if (boardId) this.openBoard(boardId);
        }
      });
    });

    // Attach Click Handlers to Menu Buttons
    const menuBtns = this.dashboardBoardsGrid.querySelectorAll('.wall-card-menu-btn');
    menuBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const boardId = btn.getAttribute('data-board-id');
        const board = boards.find(b => b.id === boardId);
        if (board) {
          const rect = btn.getBoundingClientRect();
          this.openDashboardCardMenu(board, rect.right, rect.bottom);
        }
      });
    });
  }

  openDashboardCardMenu(board, x, y) {
    this.closeDashboardCardMenu();

    const isTrash = this.dashboardTab === 'trash' || board.is_trashed;
    const menu = document.createElement('div');
    menu.id = 'dashboardCardMenu';
    menu.className = 'dashboard-card-menu';
    menu.style.left = `${Math.min(x - 180, window.innerWidth - 220)}px`;
    menu.style.top = `${y + 6}px`;

    menu.innerHTML = `
      ${!isTrash ? `
        <button type="button" class="dashboard-card-menu-item" data-action="open">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M6 4h20v2.667H6zm0 6.667h20v2.666H6zm0 6.666h20V20H6zm0 6.667h13.333V26.667H6z"/></svg>
          <span>Open padlet</span>
        </button>
        <button type="button" class="dashboard-card-menu-item" data-action="copy">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M18.667 4H9.333C7.86 4 6.667 5.193 6.667 6.667v14.666h2.666V6.667h9.334zm4 5.333h-9.334c-1.473 0-2.666 1.194-2.666 2.667V28c0 1.473 1.193 2.667 2.666 2.667h9.334c1.473 0 2.666-1.194 2.666-2.667V12c0-1.473-1.193-2.667-2.666-2.667m0 18.667h-9.334V12h9.334z"/></svg>
          <span>Copy link</span>
        </button>
        <button type="button" class="dashboard-card-menu-item" data-action="rename">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="m23.111 2 6.889 6.889-18.222 18.222H4.889V20.222zM21.222 7.667 8.889 20v3.222H12.11l12.333-12.333z"/></svg>
          <span>Rename padlet</span>
        </button>
        <button type="button" class="dashboard-card-menu-item" data-action="duplicate">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M4 6.667C4 5.193 5.193 4 6.667 4h12c1.473 0 2.666 1.193 2.666 2.667v12c0 1.473-1.193 2.666-2.666 2.666h-12C5.193 21.333 4 20.14 4 18.667zm2.667 0v12h12v-12zM10.667 24V25.333c0 1.474 1.193 2.667 2.666 2.667h12c1.474 0 2.667-1.193 2.667-2.667v-12c0-1.473-1.193-2.666-2.667-2.666H24v2.666h1.333v12h-12V24z"/></svg>
          <span>Remake / Duplicate</span>
        </button>
        <button type="button" class="dashboard-card-menu-item" data-action="bookmark">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M7.333 4C6.23 4 5.333 4.897 5.333 6v22.667a1.333 1.333 0 0 0 2.06 1.116L16 23.774l8.607 6.009a1.333 1.333 0 0 0 2.06-1.116V6c0-1.103-.897-2-2-2z"/></svg>
          <span>${board.is_bookmarked ? 'Remove bookmark' : 'Bookmark'}</span>
        </button>
        <button type="button" class="dashboard-card-menu-item danger" data-action="trash">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M12 2.667a1.333 1.333 0 0 0-1.333 1.333V6H4a1.333 1.333 0 0 0 0 2.667h1.439l1.642 18.067A3.333 3.333 0 0 0 10.395 30h11.21a3.333 3.333 0 0 0 3.314-3.266L26.561 8.667H28a1.333 1.333 0 1 0 0-2.667h-6.667V4A1.333 1.333 0 0 0 20 2.667zM8.114 8.667h15.772l-1.616 17.777a.667.667 0 0 1-.675.623h-11.21a.667.667 0 0 1-.675-.623z"/></svg>
          <span>Move to trash</span>
        </button>
      ` : `
        <button type="button" class="dashboard-card-menu-item" data-action="restore">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M16 4a12 12 0 1 0 11.314 8h-2.828A9.333 9.333 0 1 1 16 6.667V12l6.667-6.667L16 0v4z"/></svg>
          <span>Restore padlet</span>
        </button>
        <button type="button" class="dashboard-card-menu-item danger" data-action="delete">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M12 2.667a1.333 1.333 0 0 0-1.333 1.333V6H4a1.333 1.333 0 0 0 0 2.667h1.439l1.642 18.067A3.333 3.333 0 0 0 10.395 30h11.21a3.333 3.333 0 0 0 3.314-3.266L26.561 8.667H28a1.333 1.333 0 1 0 0-2.667h-6.667V4A1.333 1.333 0 0 0 20 2.667zM8.114 8.667h15.772l-1.616 17.777a.667.667 0 0 1-.675.623h-11.21a.667.667 0 0 1-.675-.623z"/></svg>
          <span>Delete permanently</span>
        </button>
      `}
    `;

    document.body.appendChild(menu);

    menu.querySelectorAll('.dashboard-card-menu-item').forEach(item => {
      item.addEventListener('click', async (e) => {
        e.stopPropagation();
        const action = item.getAttribute('data-action');
        this.closeDashboardCardMenu();

        if (action === 'open') {
          this.openBoard(board.id);
        } else if (action === 'copy') {
          const url = `${window.location.origin}/?board=${board.id}`;
          navigator.clipboard.writeText(url);
          this.showToast('Board link copied to clipboard!');
        } else if (action === 'rename') {
          const newTitle = prompt('Rename padlet:', board.title);
          if (newTitle && newTitle.trim() && newTitle.trim() !== board.title) {
            await this.backend.updateBoardTitle(board.id, newTitle.trim());
            if (this.currentBoardId === board.id) {
              if (this.state && this.state.board) this.state.board.title = newTitle.trim();
              if (this.boardTitle) this.boardTitle.textContent = newTitle.trim();
              document.title = `${newTitle.trim()} — Padles`;
            }
            this.showToast(`Renamed to "${newTitle.trim()}"`);
            this.renderDashboardBoards();
          }
        } else if (action === 'duplicate') {
          const duplicated = await this.backend.duplicateBoard(board.id);
          if (duplicated) {
            this.showToast(`Created "${duplicated.title}"`);
            this.renderDashboardBoards();
          }
        } else if (action === 'bookmark') {
          const isBookmarked = await this.backend.toggleBookmark(board.id);
          this.showToast(isBookmarked ? 'Added to Bookmarks' : 'Removed from Bookmarks');
          this.renderDashboardBoards();
        } else if (action === 'trash') {
          await this.backend.trashBoard(board.id);
          this.showToast('Moved padlet to trash');
          this.renderDashboardBoards();
        } else if (action === 'restore') {
          await this.backend.restoreBoard(board.id);
          this.showToast('Restored padlet');
          this.renderDashboardBoards();
        } else if (action === 'delete') {
          if (confirm(`Permanently delete "${board.title}"? This cannot be undone.`)) {
            await this.backend.deleteBoardPermanently(board.id);
            this.showToast('Permanently deleted');
            this.renderDashboardBoards();
          }
        }
      });
    });

    const outsideCloser = (e) => {
      if (!menu.contains(e.target)) {
        this.closeDashboardCardMenu();
        document.removeEventListener('click', outsideCloser);
      }
    };
    setTimeout(() => document.addEventListener('click', outsideCloser), 50);
  }

  closeDashboardCardMenu() {
    const existing = document.getElementById('dashboardCardMenu');
    if (existing) existing.remove();
  }

  formatTimeAgo(dateStr) {
    if (!dateStr) return 'just now';
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d`;
    if (diff < 86400 * 30) return `${Math.floor(diff / (86400 * 7))}w`;
    return `${Math.floor(diff / (86400 * 30))}mo`;
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PadlesShelfApp();
});
