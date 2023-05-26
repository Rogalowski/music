import _ from 'lodash'

//auto import components
export default {
    install(app) {
        const baseComponents = import.meta.glob("../components/base/*.vue", {
            eager: true,
        })

        Objects.entries(baseComponents).forEach(([path, module]) => {
            const componentName = _.upperFirst(
                _.camelCase(
                    path
                        .split("/")
                        .pop()
                        .replace(/\.\w+$/, "")
                )
            )
            console.log(path, componentName)
            app.component(`Base${componentName}`, module.default)
        });
    }
}
