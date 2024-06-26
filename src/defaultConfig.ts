import type { ModuleOptions } from './types/module'

const defaultThrowErrorValue = { throwError: true }


export const defaultSecurityConfig = (serverlUrl: string, owaspDefaults: ModuleOptions['owaspDefaults']) => {
  const defaults: any = {
    owaspDefaults,
    headers: {
      crossOriginResourcePolicy: 'same-origin',
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginEmbedderPolicy: 'credentialless',
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        'upgrade-insecure-requests': true
      },
      originAgentCluster: '?1',
      referrerPolicy: 'no-referrer',
      strictTransportSecurity: {
        maxAge: 15552000,
        includeSubdomains: true,
      },
      xContentTypeOptions: 'nosniff',
      xDNSPrefetchControl: 'off',
      xDownloadOptions: 'noopen',
      xFrameOptions: 'SAMEORIGIN',
      xPermittedCrossDomainPolicies: 'none',
      xXSSProtection: '0',
      permissionsPolicy: {
        camera: [],
        'display-capture': [],
        fullscreen: [],
        geolocation: [],
        microphone: []
      }
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2000000,
      maxUploadFileRequestInBytes: 8000000,
      ...defaultThrowErrorValue
    },
    rateLimiter: {
      // Twitter search rate limiting
      tokensPerInterval: 150,
      interval: 300_000,
      headers: false,
      driver: {
        name: 'lruCache'
      },
      ...defaultThrowErrorValue
    },
    xssValidator: {
      methods: ['GET', 'POST'],
      ...defaultThrowErrorValue
    },
    corsHandler: {
      // Options by CORS middleware for Express https://github.com/expressjs/cors#configuration-options
      origin: serverlUrl,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflight: {
        statusCode: 204
      }
    },
    allowedMethodsRestricter: {
      methods: '*',
      ...defaultThrowErrorValue
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: true,
    // https://github.com/Talljack/unplugin-remove/blob/main/src/types.ts
    removeLoggers: {
      external: [],
      consoleType: ['log', 'debug'],
      include: [/\.[jt]sx?$/, /\.vue\??/],
      exclude: [/node_modules/, /\.git/]
    },
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
      nitroHeaders: true,
      exportToPresets: true,
    },
    sri: true
  }

  if (owaspDefaults === 'security') {
    defaults.headers.crossOriginEmbedderPolicy = 'require-corp'
    defaults.headers.contentSecurityPolicy = {
      'base-uri': ["'none'"],
      'default-src' : ["'none'"],
      'connect-src': ["'self'", 'https:'],
      'font-src': ["'self'", 'https:', 'data:'],
      'form-action': ["'self'"],
      'frame-ancestors': ["'self'"],
      'frame-src': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'manifest-src': ["'self'"],
      'media-src': ["'self'"],
      'object-src': ["'none'"],
      'script-src-attr': ["'none'"],
      'style-src': ["'self'", 'https:', "'nonce-{{nonce}}'"],
      'script-src': ["'self'", 'https:', "'strict-dynamic'", "'nonce-{{nonce}}'"],
      'upgrade-insecure-requests': true,
      'worker-src': ["'self'"],
    }
    defaults.headers.strictTransportSecurity = {
      maxAge: 31536000,
      includeSubdomains: true,
      preload: true
    },
    defaults.headers.xFrameOptions = 'DENY'
    defaults.headers.permissionsPolicy = {
      accelerometer: [],
      /* Disable OWASP Experimental values
      'ambient-light-sensor':[],
      */
      autoplay:[],
      /* Disable OWASP Experimental values
      battery:[],
      */
      camera:[],
      'display-capture':[],
      /* Disable OWASP Experimental values
      'document-domain':[],
      */
      'encrypted-media':[],
      fullscreen:[],
      /* Disable OWASP Experimental values
      gamepad:[],
      */
      geolocation:[],
      gyroscope:[],
      /* Disable OWASP Experimental values
      'layout-animations':['self'],
      */
      /* Disable OWASP Experimental values
      'legacy-image-formats':['self'],
      */
      magnetometer:[],
      microphone:[],
      midi:[],
      /* Disable OWASP Experimental values
      'oversized-images':['self'],
      */
      payment:[],
      'picture-in-picture':[],
      'publickey-credentials-get':[],
      'screen-wake-lock':[],
      /* Disable OWASP Experimental values
      'speaker-selection':[],
      */
      'sync-xhr':['self'],
      /* Disable OWASP Experimental values
      'unoptimized-images':['self'],
      */
      /* Disable OWASP Experimental values
      'unsized-media':['self'],
      */
      usb:[],
      'web-share':[],
      'xr-spatial-tracking':[]
    }
  }
  return defaults as ModuleOptions
}


