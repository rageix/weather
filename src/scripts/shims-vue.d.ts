// Don't delete! This file helps with imports of vue files with Typescript.
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}