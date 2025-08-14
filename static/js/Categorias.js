// ==================== PRODUCT CATEGORIES DATABASE - EDITABLE SECTION START ====================
// This file contains all product categories and their associated products
// Each category has an ID, name, description, and array of 3 products
// Products include: name, description, benefits, price, and image URL

window.categoriesData = [
    // ==================== CATEGORY 1: SUPLEMENTOS VITAMÍNICOS ====================
    {
        id: 1,
        name: "Suplementos Vitamínicos",
        description: "Vitaminas esenciales para fortalecer tu sistema inmunológico",
        products: [
            {
                id: 101,
                name: "Vitamina C Premium 1000mg",
                description: "Suplemento de vitamina C de alta potencia para fortalecer las defensas naturales. Elaborado con ácido ascórbico puro y bioflavonoides para mejor absorción.",
                benefits: [
                    "Fortalece el sistema inmunológico",
                    "Potente antioxidante natural",
                    "Mejora la absorción de hierro",
                    "Ayuda en la síntesis de colágeno",
                    "Reduce fatiga y cansancio"
                ],
                price: "$25.99",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 102,
                name: "Complejo B Avanzado",
                description: "Fórmula completa de vitaminas del complejo B para el metabolismo energético y función nerviosa. Incluye B1, B2, B6, B12, ácido fólico y biotina.",
                benefits: [
                    "Aumenta los niveles de energía",
                    "Mejora la función cerebral",
                    "Apoya el sistema nervioso",
                    "Ayuda en el metabolismo",
                    "Reduce el estrés mental"
                ],
                price: "$32.50",
            image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 103,
                name: "Vitamina D3 5000 UI",
                description: "Suplemento de vitamina D3 colecalciferol para fortalecer huesos y sistema inmune. Ideal para personas con deficiencia de exposición solar.",
                benefits: [
                    "Fortalece huesos y dientes",
                    "Mejora absorción de calcio",
                    "Apoya función inmunológica",
                    "Regula el estado de ánimo",
                    "Previene deficiencias"
                ],
                price: "$28.75",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 2: HIERBAS MEDICINALES ====================
    {
        id: 2,
        name: "Hierbas Medicinales",
        description: "Remedios naturales a base de plantas medicinales tradicionales",
        products: [
            {
                id: 201,
                name: "Extracto de Echinacea Orgánica",
                description: "Tintura líquida de Echinacea purpurea orgánica, tradicionalmente usada para fortalecer las defensas naturales y combatir resfriados.",
                benefits: [
                    "Estimula sistema inmunológico",
                    "Combate infecciones respiratorias",
                    "Propiedades antiinflamatorias",
                    "Acelera recuperación de resfriados",
                    "100% orgánica certificada"
                ],
                price: "$45.00",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 202,
                name: "Cápsulas de Cúrcuma y Pimienta Negra",
                description: "Potente combinación de cúrcuma con piperina para maximizar la absorción. Conocida por sus propiedades antiinflamatorias y antioxidantes.",
                benefits: [
                    "Poderoso antiinflamatorio natural",
                    "Mejora la digestión",
                    "Protege función hepática",
                    "Antioxidante potente",
                    "Alivia dolores articulares"
                ],
                price: "$38.90",
        image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 203,
                name: "Té de Manzanilla Premium",
                description: "Flores de manzanilla orgánica secas de la mejor calidad. Perfecta para relajación, digestión y como calmante natural antes de dormir.",
                benefits: [
                    "Promueve la relajación",
                    "Mejora la calidad del sueño",
                    "Alivia problemas digestivos",
                    "Reduce ansiedad leve",
                    "Propiedades antiinflamatorias"
                ],
                price: "$22.50",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 3: ACEITES ESENCIALES ====================
    {
        id: 3,
        name: "Aceites Esenciales",
        description: "Aceites puros y naturales para aromaterapia y bienestar",
        products: [
            {
                id: 301,
                name: "Aceite Esencial de Lavanda Puro",
                description: "Aceite esencial 100% puro de lavanda francesa, destilado al vapor. Ideal para aromaterapia, relajación y cuidado de la piel.",
                benefits: [
                    "Promueve relajación profunda",
                    "Mejora calidad del sueño",
                    "Alivia estrés y ansiedad",
                    "Propiedades antisépticas",
                    "Calma irritaciones de la piel"
                ],
                price: "$35.00",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 302,
                name: "Aceite de Árbol de Té Australiano",
                description: "Aceite esencial puro de Melaleuca alternifolia de Australia. Conocido por sus potentes propiedades antimicrobianas y purificadoras.",
                benefits: [
                    "Poderoso antimicrobiano",
                    "Trata acné y imperfecciones",
                    "Purifica el ambiente",
                    "Alivia irritaciones cutáneas",
                    "Propiedades antifúngicas"
                ],
                price: "$29.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 303,
                name: "Aceite Esencial de Eucalipto",
                description: "Aceite esencial de eucalipto radiata, ideal para vías respiratorias. Proporciona sensación de frescura y claridad mental.",
                benefits: [
                    "Descongestiona vías respiratorias",
                    "Mejora concentración mental",
                    "Propiedades expectorantes",
                    "Purifica el ambiente",
                    "Alivia dolores musculares"
                ],
                price: "$26.75",
              image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 4: PRODUCTOS DIGESTIVOS ====================
    {
        id: 4,
        name: "Salud Digestiva",
        description: "Productos naturales para mejorar la digestión y salud intestinal",
        products: [
            {
                id: 401,
                name: "Probióticos Multi-Cepa 50 Billones",
                description: "Complejo avanzado de 12 cepas probióticas con 50 billones de UFC. Incluye prebióticos para nutrir la flora intestinal beneficiosa.",
                benefits: [
                    "Restaura flora intestinal",
                    "Mejora digestión y absorción",
                    "Fortalece sistema inmune",
                    "Reduce hinchazón abdominal",
                    "Apoya salud intestinal"
                ],
                price: "$55.00",
                image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 402,
                name: "Enzimas Digestivas Completas",
                description: "Fórmula avanzada con amilasa, proteasa, lipasa y más. Ayuda a descomponer proteínas, carbohidratos y grasas para mejor digestión.",
                benefits: [
                    "Mejora digestión de alimentos",
                    "Reduce gases e hinchazón",
                    "Aumenta absorción de nutrientes",
                    "Alivia molestias digestivas",
                    "Apoya función pancreática"
                ],
                price: "$42.50",
                image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 403,
                name: "Fibra de Psyllium Orgánica",
                description: "Cáscara de psyllium orgánica pura, rica en fibra soluble. Excelente para regular el tránsito intestinal y mantener niveles saludables de colesterol.",
                benefits: [
                    "Regula tránsito intestinal",
                    "Ayuda a controlar colesterol",
                    "Promueve saciedad",
                    "Limpia intestinos naturalmente",
                    "Rica en fibra soluble"
                ],
                price: "$31.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 5: CUIDADO DE LA PIEL ====================
    {
        id: 5,
        name: "Cuidado Natural de la Piel",
        description: "Productos orgánicos para el cuidado integral de tu piel",
        products: [
            {
                id: 501,
                name: "Serum de Vitamina C y Ácido Hialurónico",
                description: "Serum facial con vitamina C estabilizada al 20% y ácido hialurónico de bajo peso molecular. Combate signos del envejecimiento y aporta luminosidad.",
                benefits: [
                    "Reduce líneas de expresión",
                    "Ilumina y unifica el tono",
                    "Hidratación profunda",
                    "Estimula producción de colágeno",
                    "Protege contra radicales libres"
                ],
                price: "$48.00",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 502,
                name: "Crema Facial de Rosa Mosqueta Orgánica",
                description: "Crema nutritiva con aceite de rosa mosqueta prensado en frío y extractos botánicos. Regenera y nutre profundamente la piel madura.",
                benefits: [
                    "Regenera células de la piel",
                    "Atenúa cicatrices y manchas",
                    "Nutre profundamente",
                    "Propiedades antiedad",
                    "100% ingredientes naturales"
                ],
                price: "$39.90",
              image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 503,
                name: "Mascarilla de Arcilla Bentonítica",
                description: "Mascarilla purificante con arcilla bentonítica de grado cosmético. Absorbe impurezas, controla grasa y minimiza poros dilatados.",
                benefits: [
                    "Purifica poros profundamente",
                    "Controla exceso de grasa",
                    "Minimiza apariencia de poros",
                    "Remueve toxinas de la piel",
                    "Deja piel suave y luminosa"
                ],
                price: "$27.50",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 6: RELAJACIÓN Y SUEÑO ====================
    {
        id: 6,
        name: "Relajación y Sueño",
        description: "Productos naturales para promover la relajación y un sueño reparador",
        products: [
            {
                id: 601,
                name: "Melatonina 3mg Sublingual",
                description: "Tabletas sublinguales de melatonina de liberación rápida. Ayuda a regular el ciclo natural del sueño sin crear dependencia.",
                benefits: [
                    "Induce sueño natural",
                    "Regula ritmo circadiano",
                    "Mejora calidad del sueño",
                    "Reduce tiempo para dormir",
                    "No genera dependencia"
                ],
                price: "$24.90",
                image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 602,
                name: "Cápsulas de Valeriana y Pasiflora",
                description: "Fórmula herbal relajante que combina valeriana, pasiflora y melisa. Ideal para reducir ansiedad y promover relajación natural.",
                benefits: [
                    "Calma ansiedad naturalmente",
                    "Promueve relajación muscular",
                    "Mejora estado de ánimo",
                    "Facilita conciliación del sueño",
                    "Sin efectos secundarios"
                ],
                price: "$33.75",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 603,
                name: "Spray de Magnesio Transdérmico",
                description: "Spray de cloruro de magnesio para aplicación tópica. Absorción directa a través de la piel para relajación muscular inmediata.",
                benefits: [
                    "Relaja músculos tensos",
                    "Absorción rápida y directa",
                    "Alivia calambres musculares",
                    "Mejora recuperación deportiva",
                    "Reduce estrés físico"
                ],
                price: "$29.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 7: DETOX Y LIMPIEZA ====================
    {
        id: 7,
        name: "Detox y Limpieza",
        description: "Productos para desintoxicar y limpiar tu organismo naturalmente",
        products: [
            {
                id: 701,
                name: "Chlorella Orgánica en Polvo",
                description: "Microalga chlorella de cultivo orgánico, rica en clorofila y nutrientes. Potente desintoxicante natural y fuente de proteína completa.",
                benefits: [
                    "Elimina metales pesados",
                    "Rica en clorofila purificadora",
                    "Apoya función hepática",
                    "Alto contenido proteico",
                    "Fortalece sistema inmune"
                ],
                price: "$41.50",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 702,
                name: "Té Verde Matcha Premium",
                description: "Matcha ceremonial japonés de la más alta calidad. Rico en antioxidantes EGCG y L-teanina para energía sostenida y desintoxicación celular.",
                benefits: [
                    "Potente antioxidante natural",
                    "Acelera metabolismo",
                    "Mejora concentración mental",
                    "Desintoxica a nivel celular",
                    "Energía sostenida sin nerviosismo"
                ],
                price: "$55.00",
            image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 703,
                name: "Cápsulas de Cardo Mariano",
                description: "Extracto estandarizado de cardo mariano con 80% silimarina. Protege y regenera células hepáticas, ideal para desintoxicación del hígado.",
                benefits: [
                    "Protege función hepática",
                    "Regenera células del hígado",
                    "Neutraliza toxinas",
                    "Mejora digestión de grasas",
                    "Apoya procesos de detox"
                ],
                price: "$37.90",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 8: ENERGÍA Y VITALIDAD ====================
    {
        id: 8,
        name: "Energía y Vitalidad",
        description: "Suplementos naturales para aumentar energía y vitalidad",
        products: [
            {
                id: 801,
                name: "Ginseng Rojo Coreano Premium",
                description: "Extracto de ginseng rojo coreano de 6 años, estandarizado en ginsenósidos. Adaptógeno tradicional para energía y resistencia al estrés.",
                benefits: [
                    "Aumenta energía física y mental",
                    "Mejora resistencia al estrés",
                    "Fortalece sistema inmune",
                    "Equilibra niveles hormonales",
                    "Mejora función cognitiva"
                ],
                price: "$65.00",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 802,
                name: "Maca Peruana en Polvo",
                description: "Raíz de maca andina gelatinizada para mejor digestibilidad. Superalimento tradicional que aumenta energía, resistencia y libido naturalmente.",
                benefits: [
                    "Incrementa energía natural",
                    "Mejora resistencia física",
                    "Equilibra hormonas naturalmente",
                    "Aumenta libido y fertilidad",
                    "Rica en aminoácidos esenciales"
                ],
                price: "$34.90",
        image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 803,
                name: "Coenzima Q10 100mg",
                description: "CoQ10 en forma de ubiquinona altamente biodisponible. Esencial para producción de energía celular y protección cardiovascular.",
                benefits: [
                    "Aumenta energía celular",
                    "Protege salud cardiovascular",
                    "Potente antioxidante",
                    "Mejora resistencia física",
                    "Apoya función mitocondrial"
                ],
                price: "$59.90",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 9: SALUD ARTICULAR ====================
    {
        id: 9,
        name: "Salud Articular",
        description: "Productos naturales para mantener articulaciones sanas y flexibles",
        products: [
            {
                id: 901,
                name: "Glucosamina + Condroitina + MSM",
                description: "Fórmula completa para salud articular con glucosamina, condroitina y MSM. Apoya la regeneración del cartílago y reduce inflamación articular.",
                benefits: [
                    "Regenera cartílago articular",
                    "Reduce dolor e inflamación",
                    "Mejora flexibilidad",
                    "Fortalece tejido conectivo",
                    "Previene desgaste articular"
                ],
                price: "$52.50",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 902,
                name: "Cúrcuma con Boswellia y Jengibre",
                description: "Potente fórmula antiinflamatoria que combina cúrcuma, boswellia y jengibre. Alivia dolor articular y mejora movilidad de forma natural.",
                benefits: [
                    "Poderoso antiinflamatorio",
                    "Alivia dolor articular",
                    "Mejora movilidad",
                    "Reduce rigidez matutina",
                    "Ingredientes 100% naturales"
                ],
                price: "$44.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 903,
                name: "Colágeno Hidrolizado Tipo II",
                description: "Colágeno específico para articulaciones con péptidos bioactivos. Ayuda a mantener la estructura y flexibilidad del cartílago articular.",
                benefits: [
                    "Nutre cartílago articular",
                    "Mejora flexibilidad",
                    "Reduce dolor en movimiento",
                    "Fortalece ligamentos",
                    "Alta biodisponibilidad"
                ],
                price: "$48.75",
              image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 10: CONTROL DE PESO ====================
    {
        id: 10,
        name: "Control de Peso Natural",
        description: "Productos naturales para apoyar un peso saludable",
        products: [
            {
                id: 1001,
                name: "Garcinia Cambogia 60% HCA",
                description: "Extracto puro de Garcinia Cambogia estandarizado al 60% en ácido hidroxicítrico. Ayuda a controlar apetito y bloquear formación de grasa.",
                benefits: [
                    "Suprime apetito naturalmente",
                    "Bloquea síntesis de grasa",
                    "Acelera metabolismo",
                    "Mejora estado de ánimo",
                    "Sin estimulantes artificiales"
                ],
                price: "$39.90",
                image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1002,
                name: "Té Verde + L-Carnitina Termogénico",
                description: "Fórmula termogénica natural con té verde EGCG y L-carnitina. Acelera metabolismo de grasas y proporciona energía para ejercicio.",
                benefits: [
                    "Acelera quema de grasa",
                    "Aumenta energía para ejercicio",
                    "Mejora oxidación de grasas",
                    "Rico en antioxidantes",
                    "Apoya metabolismo saludable"
                ],
                price: "$42.50",
                image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1003,
                name: "Fibra de Konjac (Glucomanano)",
                description: "Fibra soluble de raíz de konjac que se expande en el estómago. Promueve saciedad y ayuda a controlar porciones de comida naturalmente.",
                benefits: [
                    "Promueve sensación de saciedad",
                    "Controla porciones naturalmente",
                    "Regula niveles de glucosa",
                    "Mejora salud digestiva",
                    "Baja en calorías"
                ],
                price: "$28.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 11: SALUD MENTAL ====================
    {
        id: 11,
        name: "Salud Mental y Cognitiva",
        description: "Suplementos naturales para apoyar función cerebral y bienestar mental",
        products: [
            {
                id: 1101,
                name: "Omega-3 DHA de Algas Marinas",
                description: "DHA vegetal extraído de microalgas, esencial para función cerebral. Mayor pureza que aceite de pescado, ideal para veganos y vegetarianos.",
                benefits: [
                    "Mejora función cerebral",
                    "Apoya memoria y concentración",
                    "Reduce inflamación neuronal",
                    "Protege salud cardiovascular",
                    "100% fuente vegetal"
                ],
                price: "$58.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1102,
                name: "Ginkgo Biloba 120mg",
                description: "Extracto estandarizado de Ginkgo Biloba con 24% flavonoides. Mejora circulación cerebral, memoria y función cognitiva en adultos.",
                benefits: [
                    "Mejora circulación cerebral",
                    "Aumenta memoria y concentración",
                    "Protege neuronas del envejecimiento",
                    "Reduce fatiga mental",
                    "Apoya función cognitiva"
                ],
                price: "$35.75",
              image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1103,
                name: "Ashwagandha KSM-66 Premium",
                description: "Extracto patentado KSM-66 de ashwagandha, el adaptógeno más estudiado. Reduce cortisol, estrés y ansiedad mientras mejora energía mental.",
                benefits: [
                    "Reduce estrés y ansiedad",
                    "Mejora resistencia mental",
                    "Regula niveles de cortisol",
                    "Aumenta energía y vitalidad",
                    "Mejora calidad del sueño"
                ],
                price: "$49.90",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 12: SALUD FEMENINA ====================
    {
        id: 12,
        name: "Salud Femenina",
        description: "Productos especializados para el bienestar de la mujer",
        products: [
            {
                id: 1201,
                name: "Ácido Fólico + Hierro + B12",
                description: "Fórmula específica para mujeres con ácido fólico, hierro quelado y vitamina B12. Ideal durante embarazo y lactancia, previene anemia.",
                benefits: [
                    "Previene defectos del tubo neural",
                    "Combate anemia ferropénica",
                    "Apoya desarrollo fetal saludable",
                    "Mejora niveles de energía",
                    "Esencial durante embarazo"
                ],
                price: "$32.90",
                image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1202,
                name: "Vitex (Sauzgatillo) para Equilibrio Hormonal",
                description: "Extracto de Vitex agnus-castus tradicional para equilibrio hormonal femenino. Ayuda a regular ciclos menstruales y síntomas premenstruales.",
                benefits: [
                    "Regula ciclos menstruales",
                    "Alivia síntomas premenstruales",
                    "Equilibra hormonas naturalmente",
                    "Reduce irritabilidad y cambios de humor",
                    "Tradicional para salud femenina"
                ],
                price: "$38.50",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1203,
                name: "Colágeno + Biotina + Ácido Hialurónico",
                description: "Fórmula beauty con colágeno marino, biotina y ácido hialurónico. Mejora elasticidad de la piel, fortalece cabello y uñas desde adentro.",
                benefits: [
                    "Mejora elasticidad de la piel",
                    "Fortalece cabello y uñas",
                    "Hidrata desde el interior",
                    "Reduce líneas de expresión",
                    "Promueve belleza natural"
                ],
                price: "$55.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 13: SALUD CARDIOVASCULAR ====================
    {
        id: 13,
        name: "Salud Cardiovascular",
        description: "Productos naturales para mantener un corazón saludable",
        products: [
            {
                id: 1301,
                name: "Omega-3 EPA/DHA 1000mg",
                description: "Aceite de pescado purificado de aguas profundas, rico en EPA y DHA. Esencial para salud cardiovascular y función cerebral óptima.",
                benefits: [
                    "Protege salud cardiovascular",
                    "Reduce triglicéridos",
                    "Mejora función cerebral",
                    "Propiedades antiinflamatorias",
                    "Pureza garantizada sin mercurio"
                ],
                price: "$43.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1302,
                name: "Coenzima Q10 + Magnesio + Potasio",
                description: "Fórmula cardioprotectora con CoQ10, magnesio y potasio. Apoya función del músculo cardíaco y mantiene ritmo cardíaco regular.",
                benefits: [
                    "Fortalece músculo cardíaco",
                    "Regula ritmo cardíaco",
                    "Mejora energía celular",
                    "Apoya presión arterial saludable",
                    "Protege contra estrés oxidativo"
                ],
                price: "$52.90",
            image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1303,
                name: "Extracto de Espino Blanco",
                description: "Extracto estandarizado de flores y hojas de espino blanco. Tónico cardíaco tradicional que fortalece y regula la función cardíaca.",
                benefits: [
                    "Fortalece función cardíaca",
                    "Mejora circulación coronaria",
                    "Regula presión arterial",
                    "Tónico cardíaco natural",
                    "Tradicionalmente usado por siglos"
                ],
                price: "$36.75",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 14: SUPERALIMENTOS ====================
    {
        id: 14,
        name: "Superalimentos",
        description: "Alimentos nutritivos densos en nutrientes para máxima vitalidad",
        products: [
            {
                id: 1401,
                name: "Spirulina Orgánica en Tabletas",
                description: "Microalga spirulina de cultivo orgánico, considerada uno de los alimentos más nutritivos del planeta. Rica en proteína completa y nutrientes esenciales.",
                benefits: [
                    "Proteína completa de alta calidad",
                    "Rica en vitaminas del complejo B",
                    "Potente antioxidante",
                    "Mejora energía y resistencia",
                    "Apoya desintoxicación natural"
                ],
                price: "$38.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1402,
                name: "Açaí Berry en Polvo Liofilizado",
                description: "Açaí berry puro liofilizado de la Amazonía brasileña. Súper fruta rica en antioxidantes, fibra y ácidos grasos esenciales.",
                benefits: [
                    "Altísimo contenido de antioxidantes",
                    "Apoya salud cardiovascular",
                    "Mejora energía natural",
                    "Rica en fibra y grasas saludables",
                    "Protege contra envejecimiento"
                ],
                price: "$59.90",
        image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1403,
                name: "Semillas de Chía Negra Orgánica",
                description: "Semillas de chía negra orgánica, rica fuente de omega-3 vegetal, fibra y proteína. Ideal para batidos, puddings y horneados saludables.",
                benefits: [
                    "Rica en omega-3 vegetal",
                    "Alta en fibra soluble",
                    "Proteína completa plant-based",
                    "Promueve saciedad",
                    "Regula niveles de glucosa"
                ],
                price: "$24.90",
                image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    },

    // ==================== CATEGORY 15: PRODUCTOS INFANTILES ====================
    {
        id: 15,
        name: "Salud Infantil Natural",
        description: "Productos naturales seguros y efectivos para niños",
        products: [
            {
                id: 1501,
                name: "Multivitamínico Infantil Gomitas",
                description: "Multivitamínico completo en deliciosas gomitas naturales sin azúcar artificial. Fórmula específica para desarrollo infantil saludable.",
                benefits: [
                    "Apoya crecimiento saludable",
                    "Fortalece sistema inmune",
                    "Mejora concentración escolar",
                    "Sabor natural agradable",
                    "Sin colorantes artificiales"
                ],
                price: "$29.90",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1502,
                name: "Probióticos Infantiles en Polvo",
                description: "Probióticos específicos para flora intestinal infantil. Cepas seguras que apoyan digestión saludable y sistema inmune en desarrollo.",
                benefits: [
                    "Desarrolla flora intestinal sana",
                    "Fortalece defensas naturales",
                    "Mejora digestión infantil",
                    "Reduce problemas estomacales",
                    "Cepas específicamente seleccionadas"
                ],
                price: "$41.50",
               image: "https://i.imgur.com/ZG5huWr.png"
            },
            {
                id: 1503,
                name: "Jarabe Natural para Tos Infantil",
                description: "Jarabe herbal suave con miel de manuka, propóleo y extractos de plantas. Alivia tos y molestias de garganta de forma natural y segura.",
                benefits: [
                    "Alivia tos naturalmente",
                    "Calma irritación de garganta",
                    "Ingredientes 100% naturales",
                    "Sabor agradable para niños",
                    "Sin efectos secundarios"
                ],
                price: "$26.90",
              image: "https://i.imgur.com/ZG5huWr.png"
            }
        ]
    }
];

// ==================== PRODUCT CATEGORIES DATABASE - EDITABLE SECTION END ====================

console.log('Categories data loaded successfully:', window.categoriesData.length, 'categories');
