module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,vue,ts}"],
  safelist: [
    "my-auto",
    "text-others-doctormanhattan",
    "text-others-superman",
    "text-kilvish",
    "text-red",
    "group-hover:border-kilvish-600",
    "group-hover:bg-others-superman100",
    "group-hover:border-others-superman",
    "group-hover:bg-kilvish-100",
    "group-hover:border-kilvish",
    "group-hover:bg-red-100",
    "group-hover:border-red",
    "group-hover:border-others-doctormanhattan",
    "group-hover:bg-others-doctormanhattan-100",
    "max-h-288",
    "max-h-182",
  ],
  theme: {
    fontFamily: {
      primary: 'Inter',
      secondary: 'Gilroy',
      curgloria: 'Gloria Hallelujah'
    },
    extend: {
      minWidth: {
        '25': '1.563rem',
        '34': '2.125rem',
        '42': '2.625rem',
        '44': '2.75rem',
        '76': '4.75rem',
        '88': '5.5rem',
        '100': '6.25rem',
        '104': '6.5rem',
        '106': '6.625rem',
        '136': '8.5rem',
        '142': '8.875rem',
        '152': '9.5rem',
        '168': '10.5rem',
        '176': '11rem',
        '182': '11.375rem',
        '185': '11.563rem',
        '200': '12.5rem',
        '220': '13.75rem',
        '250': '15.625rem',
        '352': '22rem',
        '400': '25rem',
        '432': '27rem',
        '512': '32rem',
        '640': '40rem'
      },
      maxWidth: {
        '25': '1.563rem',
        '34': '2.125rem',
        '42': '2.625rem',
        '44': '2.75rem',
        '76': '4.75rem',
        '88': '5.5rem',
        '100': '6.25rem',
        '104': '6.5rem',
        '106': '6.625rem',
        '136': '8.5rem',
        '142': '8.875rem',
        '152': '9.5rem',
        '168': '10.5rem',
        '176': '11rem',
        '182': '11.375rem',
        '185': '11.563rem',
        '200': '12.5rem',
        '220': '13.75rem',
        '250': '15.625rem',
        '330': '20.625rem',
        '352': '22rem',
        '400': '25rem',
        '432': '27rem',
        '512': '32rem',
        '640': '40rem',
        '768': '48rem'
      },
      fontSize: {
        small: ['8px', '12px'],
        overline: ['10px', { lineHeight: '16px', letterSpacing: '0.04em', textTransform: 'uppercase' }],
        captionsm: ['10px', '12px'],
        caption2: ['10px', '16px'],
        caption18: ['10px', '20px'],
        caption15: ['12px', '14px'],
        caption1: ['12px', '20px'],
        caption3: ['11px', '16px'],
        body: ['14px', '24px'],
        subheader: ['16px', '24px'],
        subheader2: ['18px', '20px'],
        title: ['20px', '28px'],
        heading2: ['24px', '36px'],
        heading1: ['28px', '40px'],
        display6: ['30px', '35px'],
        display5: ['36px', '48px'],
        display4: ['48px', '56px'],
        display3: ['56px', '64px'],
        display2: ['64px', '72px'],
        display1: ['80px', '88px']
      },
      
      
      borderWidth: {
        '3': '3px',
        '6': '6px',
        '7': '7px'
      },
      colors: {
        textdark: '#0F1D40',
        textmedium: '#525C76',
        textlight: '#8C93A3',
        textdisabled: '#B2B7C2',
        outline: {
          DEFAULT: '#EEEFF2',
          dark: '#B2B7C2',
          medium: '#CACDD5',
          light: '#E2E4E8',
          xlight: '#EEEFF2'
        },
        black: {
          '4': 'rgba(0, 0, 0, 0.04)',
          '8': 'rgba(0, 0, 0, 0.08)',
          '10': 'rgba(0,0,0,0.10)',
          '12': 'rgba(0, 0, 0, 0.12)',
          '16': 'rgba(0, 0, 0, 0.16)',
          '24': 'rgba(0, 0, 0, 0.24)',
          '32': 'rgba(0, 0, 0, 0.32)',
          '40': 'rgba(0, 0, 0, 0.4)',
          '45': 'rgba(0,0,0,0.45)',
          '64': 'rgba(0, 0, 0, 0.64)',
          '80': 'rgba(0, 0, 0, 0.8)',
          DEFAULT: '#000000'
        },
        white: {
          '4': 'rgba(255, 255, 255, 0.04)',
          '8': 'rgba(255, 255, 255, 0.08)',
          '12': 'rgba(255, 255, 255, 0.12)',
          '16': 'rgba(255, 255, 255, 0.16)',
          '24': 'rgba(255, 255, 255, 0.24)',
          '32': 'rgba(255, 255, 255, 0.32)',
          '40': 'rgba(255, 255, 255, 0.4)',
          '56': 'rgba(255, 255, 255, 0.56)',
          '64': 'rgba(255, 255, 255, 0.64)',
          '80': 'rgba(255, 255, 255, 0.8)',
          DEFAULT: '#ffffff'
        },
        primary: {
          '100': '#FFF6F4',
          '200': '#FFE8E4',
          '300': '#F8ACA0',
          '400': '#F9907F',
          '500': '#ED7663',
          '600': '#EB5B44',
          '700': '#E2462C',
          '800': '#CC3016',
          '900': '#B5240C',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          '100': '#E9EEF2',
          '200': '#C9D8E2',
          '300': '#B4C6D3',
          '400': '#9CB6C9',
          '500': '#8CA8BD',
          '600': '#6D90AB',
          '700': '#4D7797',
          '800': '#36668A',
          '900': '#20557D',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        kilvish: {
          '100': '#F9FAFB',
          '200': '#F3F4F6',
          '300': '#E5E7EB',
          '400': '#D1D5DB',
          '500': '#949BA8',
          '600': '#666C7C',
          '700': '#475160',
          '800': '#343E4F',
          '900': '#1D2736',
          dark: '#000114',
          DEFAULT: '#000228'
        },
        red: {
          '50': '#FDF2F2',
          '100': '#FDF2F2',
          '200': '#FBE5E5',
          '300': '#F6C8C0',
          '400': '#F3B5AB',
          '500': '#F0A295',
          '600': '#EE9080',
          '700': '#EB7E6B',
          '800': '#E86B56',
          '900': '#E55841',
          brand: '#D93121',
          dark: '#A9250F',
          DEFAULT: '#E2462C'
        },
        steelblue: {
          '100': '#E9EEF2',
          '200': '#D2DDE5',
          '300': '#BCCCD8',
          '400': '#A6BBCB',
          '500': '#8FAABE',
          '600': '#7999B1',
          '700': '#6388A4',
          '800': '#4D7797',
          '900': '#36668A',
          DEFAULT: '#20557D'
        },
        'dark-gray': {
          '100': '#747C90',
          '200': '#656E85',
          '300': '#5C657D',
          '400': '#525C76',
          '500': '#49536E',
          '600': '#3A4662',
          '700': '#2C3857',
          '800': '#192648',
          '900': '#0F1D40',
          DEFAULT: '#2C3857'
        },
        gray: {
          '100': '#FAFAFB',
          '200': '#F5F6F7',
          '300': '#EEEFF2',
          '400': '#E2E4E8',
          '450': '#9CA3AF',
          '500': '#CACDD5',
          '600': '#B2B7C2',
          '700': '#A4A9B6',
          '750': '#374151',
          '800': '#959CAB',
          '900': '#8C93A3',
          '950': '#111827',
          DEFAULT: '#A4A9B6'
        },
        green: {
          '50': '#F9FFF8',
          '100': '#DDF1DA',
          '200': '#D9F3D6',
          '600': '#429637',
          '700': '#317727',
          DEFAULT: '#53B745'
        },
        info: {
          '100': '#F8FBFF',
          '300': '#DCEEFF',
          '500': '#78BEFF',
          '700': '#0284FE',
          '900': '#01408F',
          DEFAULT: '#0284FE'
        },
        success: {
          '100': '#EAFCF7',
          '300': '#BDF0E0',
          '500': '#3ED3A3',
          '700': '#0BB07B',
          '900': '#006242',
          DEFAULT: '#0BB07B'
        },
        warning: {
          '100': '#FFFCF5',
          '300': '#FFECC7',
          '500': '#FFCA65',
          '700': '#FFAD0D',
          '900': '#F07300',
          DEFAULT: '#FFAD0D'
        },
        yellow: {
          '50': '#FEF9EE',
          '100': '#FEF9EE',
          '200': '#FEF3DC',
          '300': '#FDEDCB',
          '400': '#FCE7B9',
          '500': '#FBE1A7',
          '600': '#FBDC96',
          '700': '#FAD685',
          '800': '#F9D073',
          '900': '#F9CA61',
          DEFAULT: '#F8C450'
        },
        danger: {
          '100': '#FFF8F8',
          '300': '#FFDFDF',
          '500': '#FF6666',
          '700': '#F03D3D',
          '900': '#A50000',
          DEFAULT: '#F03D3D'
        },
        random: {
          '222222': '#222222',
          '313131': '#313131',
          '8e6200': '#8E6200'
        },
        superman: {
          '100': '#EEF7FB',
          '200': '#DCEEF8',
          DEFAULT: '#52AADB'
        },
        ogray: {
          '500': '#262626'
        },
        others: {
          black181818: '#181818',
          gray42: '#6b6b6b',
          doctormanhattan: '#0075FF',
          doctormanhattan100: '#F3F9FC',
          superman: '#52AADB',
          superman100: '#EEF7FB',
          redfaded: '#BB412C',
          summaryBlack: '#171717',
          summaryHover: '#272727',
          summaryBorderHover: '#525252',
          ytBanner: '#151515',
          suggLoader: '#3B3B3B',
          nightwing: '#21557D'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      }
    }
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          paddingLeft: "20px",
          paddingRight: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          "@screen sm": {
            maxWidth: "600px",
          },
          "@screen md": {
            maxWidth: "700px",
          },
          "@screen lg": {
            maxWidth: "1280px",
            paddingLeft: "56px",
            paddingRight: "56px",
          },
          "@screen xl": {
            maxWidth: "1344px",
          },
        },
      });
    },
    require("tailwindcss-animate")
  ],
};
