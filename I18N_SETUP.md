# 🌍 Sistema de Internacionalización (i18n)

## 📋 Descripción

Sistema completo de internacionalización para Copoazú Labs que soporta **inglés** y **español** con detección automática basada en ubicación geográfica y preferencias del navegador.

## 🚀 Características

### ✅ Detección Automática de Idioma

#### **1. Detección por Ubicación Geográfica (Vercel Edge)**
- **Tecnología**: Vercel Edge Middleware con `request.geo`
- **Precisión**: Alta precisión basada en la ubicación del usuario
- **Países hispanohablantes detectados**:
  - España (ES), México (MX), Argentina (AR), Colombia (CO)
  - Perú (PE), Venezuela (VE), Chile (CL), Ecuador (EC)
  - Bolivia (BO), Paraguay (PY), Uruguay (UY), Costa Rica (CR)
  - Panamá (PA), Honduras (HN), El Salvador (SV), Guatemala (GT)
  - Nicaragua (NI), República Dominicana (DO), Cuba (CU), Puerto Rico (PR)

#### **2. Fallback del Navegador**
- **Header**: `Accept-Language`
- **Prioridad**: Español > Inglés > Default (Inglés)
- **Ejemplo**: `Accept-Language: es-ES,es;q=0.9,en;q=0.8`

#### **3. Preferencia del Usuario**
- **localStorage**: Guarda la preferencia del usuario
- **Persistencia**: Mantiene el idioma seleccionado

### ✅ Routing Inteligente

#### **URLs Soportadas:**
```
/                    → Redirección automática basada en geo/browser
/en                  → Sitio en inglés
/es                  → Sitio en español
/en/products         → Productos en inglés
/es/collections      → Colecciones en español
```

#### **Flujo de Detección:**
1. **Usuario visita `/`**
2. **Middleware detecta ubicación** (Vercel Edge)
3. **Si no hay geo data** → usa `Accept-Language`
4. **Redirección automática** a `/es` o `/en`
5. **Siguientes visitas** respetan preferencia guardada

## 🔧 Implementación Técnica

### **Middleware (src/middleware.ts)**
```typescript
// Detección por Vercel Edge geo data
function detectLanguageFromGeo(request: NextRequest): string {
  const geo = request.geo;
  const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'BO', 'PY', 'UY', 'CR', 'PA', 'HN', 'SV', 'GT', 'NI', 'DO', 'CU', 'PR'];
  return spanishCountries.includes(geo.country) ? 'es' : 'en';
}

// Fallback por browser headers
function detectLanguageFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  // Parse Accept-Language header...
}
```

### **Configuración Next.js**
```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
```

### **Estructura de Archivos**
```
src/
├── i18n/
│   ├── config.ts          # Configuración de idiomas
│   └── request.ts         # Configuración next-intl
├── messages/
│   ├── en.json           # Traducciones inglés
│   └── es.json           # Traducciones español
├── components/
│   └── LanguageSwitcher.tsx  # Switcher de idioma
├── app/
│   └── [locale]/         # Páginas con soporte i18n
└── middleware.ts         # Edge middleware
```

## 🎯 Componente Language Switcher

### **Ubicación:**
- **Desktop**: Header superior derecho
- **Mobile**: Menú hamburguesa

### **Funcionalidades:**
- **Dropdown elegante** con banderas 🇺 🇪🇸
- **Navegación inteligente** mantiene la página actual
- **Persistencia** en localStorage
- **Diseño consistente** con la paleta de colores

### **Uso:**
```typescript
import LanguageSwitcher from '@/components/LanguageSwitcher';

// En el Header
<LanguageSwitcher />
```

## 📝 Archivos de Traducción

### **Estructura de Traducciones:**
```json
{
  "navigation": {
    "home": "Home",
    "products": "Products",
    "collections": "Collections"
  },
  "hero": {
    "title": "Web3 Fashion Revolution",
    "subtitle": "Discover exclusive Web3 branded clothing..."
  },
  "products": {
    "title": "Featured Products",
    "addToCart": "Add to Cart"
  }
}
```

### **Uso en Componentes:**
```typescript
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('hero');
  
  return (
    <h1>{t('title')}</h1>
    <p>{t('subtitle')}</p>
  );
}
```

## 🚀 Deployment en Vercel

### **Ventajas de Vercel Edge:**
- **Latencia ultra-baja** para detección de idioma
- **Detección precisa** por ubicación geográfica
- **Sin APIs externas** necesarias
- **Escalabilidad automática**

### **Configuración Vercel:**
```json
{
  "functions": {
    "src/app/**/*.tsx": {
      "maxDuration": 30
    }
  },
  "headers": [...],
  "rewrites": [...]
}
```

## 🧪 Testing

### **Testing Local:**
```bash
# Iniciar servidor
npm run dev

# URLs para probar:
http://localhost:3000/          # Redirección automática
http://localhost:3000/en        # Inglés forzado
http://localhost:3000/es        # Español forzado
```

### **Testing en Producción:**
- **VPN a España** → debería mostrar español
- **VPN a USA** → debería mostrar inglés
- **Cambio manual** → debería persistir

## 📊 Métricas y Analytics

### **Datos Disponibles:**
- **País del usuario** (Vercel Analytics)
- **Idioma detectado** vs seleccionado
- **Conversión por idioma**
- **Páginas más visitadas por idioma**

## 🔮 Futuras Mejoras

### **Funcionalidades Planificadas:**
- **Más idiomas**: Francés, Portugués, Italiano
- **Detección por región**: Español de México vs España
- **A/B testing** por idioma
- **Analytics avanzados** de uso por idioma
- **Cache inteligente** de traducciones

## 🛠️ Troubleshooting

### **Problemas Comunes:**

#### **1. Idioma no se detecta correctamente:**
- Verificar que `request.geo` esté disponible
- Comprobar headers de `Accept-Language`
- Revisar configuración de Vercel Edge

#### **2. Redirección infinita:**
- Verificar matcher en middleware
- Comprobar estructura de URLs
- Revisar configuración de next-intl

#### **3. Traducciones no aparecen:**
- Verificar archivos JSON en `src/messages/`
- Comprobar uso de `useTranslations`
- Revisar configuración de `NextIntlClientProvider`

---

## 📞 Soporte

Para problemas o mejoras del sistema i18n, contactar al equipo de desarrollo de Copoazú Labs.
