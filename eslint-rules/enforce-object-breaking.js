/**
 * ESLint rule: enforce-object-breaking
 * Enforces that object literals and type annotations with 3+ properties
 * must have each property on its own line (per CLAUDE.md rules)
 */
export default {
    meta: {
        type: 'layout',
        docs: {
            description:
                'Enforce breaking object literals/types with 2+ properties to new lines',
            category: 'Stylistic Issues'
        },
        fixable: null
    },
    create(context) {
        return {
            ObjectExpression(node) {
                if (node.properties.length < 3) return

                const firstProp = node.properties[0]
                const lastProp = node.properties[node.properties.length - 1]
                const startLine = firstProp.loc.start.line
                const endLine = lastProp.loc.end.line

                if (startLine === endLine) {
                    context.report({
                        node,
                        message:
                            'Object with 3+ properties must have each property on its own line'
                    })
                }
            },

            TSTypeLiteral(node) {
                if (node.members.length < 3) return

                const firstMember = node.members[0]
                const lastMember = node.members[node.members.length - 1]
                const startLine = firstMember.loc.start.line
                const endLine = lastMember.loc.end.line

                if (startLine === endLine) {
                    context.report({
                        node,
                        message:
                            'Type literal with 3+ members must have each member on its own line'
                    })
                }
            }
        }
    }
}
