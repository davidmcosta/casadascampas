import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
	darkMode: "class",
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			amberVar: 'hsl(var(--amber))',
  			amberhover: 'hsl(var(--amber-hover))',
  			amberopacity: 'hsl(var(--amberopacity))',
  			blackVar: 'hsl(var(--black-clr))',
  			blackDark: 'hsl(var(--black-dark))',
  			foreground: 'hsl(var(--foreground))',
  			background: 'hsl(var(--background))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  fontFamily: {
			  sans: [
				  'Lato',
				  'system-ui',
				  'BlinkMacSystemFont',
				  '-apple-system',
				  'Segoe UI"',
				  'Roboto',
  			'Oxygen',
  			'Ubuntu',
  			'Cantarell',
  			'Fira Sans"',
  			'Droid Sans"',
  			'Helvetica Neue"',
  			'sans-serif',
  			'Droid Sans'
		]
	},
	 fontSize: {
        // Professional font size scale
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px (body text)
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px (h3)
        '4xl': '2.25rem',    // 36px (h2)
        '5xl': '3rem',       // 48px (h1)
        '6xl': '4rem',       // 64px (display)
      },
      letterSpacing: {
        'tight': '-0.015em',
        'normal': '0',
        'wide': '0.03em',
        'wider': '0.06em',
        'widest': '0.12em'
      },
      lineHeight: {
		'tight': '1.2',
        'snug': '1.35',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2'
      }
},
},
plugins: [animate],
} satisfies Config;
