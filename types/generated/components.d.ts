import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutBusinessSectors extends Schema.Component {
  collectionName: 'components_about_business_sectors';
  info: {
    displayName: 'BusinessSectors';
  };
  attributes: {
    text: Attribute.Text;
  };
}

export interface AboutOurHistory extends Schema.Component {
  collectionName: 'components_about_our_histories';
  info: {
    displayName: 'OurHistory';
    description: '';
  };
  attributes: {
    headline: Attribute.Component<'common.title'>;
    timelineItems: Attribute.Component<'nested.timeline-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 4;
        max: 8;
      }>;
    future: Attribute.Component<'nested.statistics'> & Attribute.Required;
  };
}

export interface AboutPrinciples extends Schema.Component {
  collectionName: 'components_about_principles';
  info: {
    displayName: 'Principles';
    description: '';
  };
  attributes: {
    guidelines: Attribute.Component<'nested.icon-card', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 3;
        max: 3;
      }>;
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface AboutStatistics extends Schema.Component {
  collectionName: 'components_about_statistics';
  info: {
    displayName: 'Statistics';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface AboutStructure extends Schema.Component {
  collectionName: 'components_about_structures';
  info: {
    displayName: 'Structure';
    description: '';
  };
  attributes: {
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    statistics: Attribute.Component<'about.statistics', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 3;
        max: 3;
      }>;
    highlights: Attribute.Component<'nested.statistics', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 4;
        max: 4;
      }>;
    cta: Attribute.Component<'common.call-to-action'> & Attribute.Required;
  };
}

export interface CommonCallToAction extends Schema.Component {
  collectionName: 'components_common_call_to_actions';
  info: {
    displayName: 'CallToAction';
    description: '';
  };
  attributes: {
    text: Attribute.Text & Attribute.Required;
    linkText: Attribute.String & Attribute.Required;
    linkUrl: Attribute.String & Attribute.Required;
  };
}

export interface CommonImageCollection extends Schema.Component {
  collectionName: 'components_common_image_collections';
  info: {
    displayName: 'ImageCollection';
    icon: 'images';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    name: Attribute.String;
  };
}

export interface CommonImage extends Schema.Component {
  collectionName: 'components_common_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    image: Attribute.Media;
  };
}

export interface CommonLinkImage extends Schema.Component {
  collectionName: 'components_common_link_images';
  info: {
    displayName: 'LinkImage';
  };
  attributes: {
    image: Attribute.Media;
    link: Attribute.String & Attribute.Required;
  };
}

export interface CommonLink extends Schema.Component {
  collectionName: 'components_common_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface CommonTitle extends Schema.Component {
  collectionName: 'components_common_titles';
  info: {
    displayName: 'SectionTitle';
    description: '';
  };
  attributes: {
    overline: Attribute.String & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
  };
}

export interface HomeBanner extends Schema.Component {
  collectionName: 'components_home_banners';
  info: {
    displayName: 'Banner';
    description: '';
  };
  attributes: {
    cover: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    link1: Attribute.Component<'common.link'>;
    link2: Attribute.Component<'common.link'>;
  };
}

export interface HomeCases extends Schema.Component {
  collectionName: 'components_home_cases';
  info: {
    displayName: 'Cases';
  };
  attributes: {
    headline: Attribute.Component<'common.title'> & Attribute.Required;
  };
}

export interface HomeCertificates extends Schema.Component {
  collectionName: 'components_home_certificates';
  info: {
    displayName: 'Certificates';
    description: '';
  };
  attributes: {
    headline: Attribute.Component<'common.title'>;
    text: Attribute.Text & Attribute.Required;
    certificates: Attribute.Component<'common.image', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 3;
        max: 3;
      }>;
  };
}

export interface HomeServiceHighlight extends Schema.Component {
  collectionName: 'components_home_service_highlights';
  info: {
    displayName: 'ServiceHighlight';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    link: Attribute.Component<'common.link'> & Attribute.Required;
  };
}

export interface HomeSustainability extends Schema.Component {
  collectionName: 'components_home_sustainabilities';
  info: {
    displayName: 'Sustainability';
    description: '';
  };
  attributes: {
    cover: Attribute.Media & Attribute.Required;
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    link: Attribute.Component<'common.link'> & Attribute.Required;
  };
}

export interface InnovationAiSupportedDesign extends Schema.Component {
  collectionName: 'components_innovation_ai_supported_designs';
  info: {
    displayName: 'AISupportedDesign';
  };
  attributes: {
    text: Attribute.String;
  };
}

export interface InnovationDigitalPrinting extends Schema.Component {
  collectionName: 'components_innovation_digital_printings';
  info: {
    displayName: 'DigitalPrinting';
  };
  attributes: {
    text: Attribute.String;
  };
}

export interface InnovationIso9001Processes extends Schema.Component {
  collectionName: 'components_innovation_iso_9001_processes';
  info: {
    displayName: 'ISO9001Processes';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface NestedIconCardShort extends Schema.Component {
  collectionName: 'components_nested_icon_card_shorts';
  info: {
    displayName: 'IconCardShort';
  };
  attributes: {
    icon: Attribute.Media & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface NestedIconCardTitle extends Schema.Component {
  collectionName: 'components_nested_icon_card_titles';
  info: {
    displayName: 'IconCardTitle';
  };
  attributes: {
    icon: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface NestedIconCard extends Schema.Component {
  collectionName: 'components_nested_icon_cards';
  info: {
    displayName: 'IconCard';
    description: '';
  };
  attributes: {
    icon: Attribute.Media & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface NestedLinkCard extends Schema.Component {
  collectionName: 'components_nested_link_cards';
  info: {
    displayName: 'LinkCard';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text;
    linkText: Attribute.String & Attribute.Required;
    linkUrl: Attribute.String & Attribute.Required;
  };
}

export interface NestedOverlineCard extends Schema.Component {
  collectionName: 'components_nested_overline_cards';
  info: {
    displayName: 'OverlineCard';
  };
  attributes: {
    overline: Attribute.String & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface NestedStatistics extends Schema.Component {
  collectionName: 'components_nested_statistics';
  info: {
    displayName: 'StructureHighlight';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface NestedTestimonialCard extends Schema.Component {
  collectionName: 'components_nested_testimonial_cards';
  info: {
    displayName: 'TestimonialCard';
    description: '';
  };
  attributes: {
    logo: Attribute.Media & Attribute.Required;
    quote: Attribute.Text & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    role: Attribute.String & Attribute.Required;
  };
}

export interface NestedTextCard extends Schema.Component {
  collectionName: 'components_nested_text_cards';
  info: {
    displayName: 'TextCard';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface NestedTimelineItem extends Schema.Component {
  collectionName: 'components_nested_timeline_items';
  info: {
    displayName: 'TimelineItem';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    time: Attribute.String & Attribute.Required;
    subheading: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface PeopleEthicsAndConduct extends Schema.Component {
  collectionName: 'components_people_ethics_and_conducts';
  info: {
    displayName: 'Ethics&Conduct';
    description: '';
  };
  attributes: {
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    ethicalManual: Attribute.Text & Attribute.Required;
    downloadLink: Attribute.Component<'common.link'> & Attribute.Required;
    ethicalValues: Attribute.Text & Attribute.Required;
  };
}

export interface PeopleEthicsChannel extends Schema.Component {
  collectionName: 'components_people_ethics_channels';
  info: {
    displayName: 'EthicsChannel';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    items: Attribute.Component<'nested.link-card', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 3;
        max: 3;
      }>;
    note: Attribute.Text & Attribute.Required;
  };
}

export interface PeoplePeople extends Schema.Component {
  collectionName: 'components_people_people';
  info: {
    displayName: 'People';
    description: '';
  };
  attributes: {
    items: Attribute.Component<'nested.link-card', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 3;
        max: 3;
      }>;
    details: Attribute.Component<'nested.icon-card-title'> & Attribute.Required;
  };
}

export interface PeopleWorkWithUs extends Schema.Component {
  collectionName: 'components_people_work_withuses';
  info: {
    displayName: 'WorkWithUs';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface Products2ImageContent extends Schema.Component {
  collectionName: 'components_products_2_image_contents';
  info: {
    displayName: '2ImageContent';
  };
  attributes: {
    collage: Attribute.Component<'common.image', true> &
      Attribute.SetMinMax<{
        min: 2;
        max: 2;
      }>;
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    text: Attribute.Text;
  };
}

export interface ProductsBannerCta extends Schema.Component {
  collectionName: 'components_products_banner_ctas';
  info: {
    displayName: 'BannerCTA';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    ctaTitle: Attribute.String & Attribute.Required;
    ctaText: Attribute.Text & Attribute.Required;
    shortText: Attribute.String & Attribute.Required;
    link: Attribute.Component<'common.link'> & Attribute.Required;
    cover: Attribute.Media & Attribute.Required;
  };
}

export interface ProductsContent extends Schema.Component {
  collectionName: 'components_products_contents';
  info: {
    displayName: 'Content';
  };
  attributes: {
    collage: Attribute.Component<'common.image', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 4;
        max: 4;
      }>;
    title: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface ProductsCustomMaterials extends Schema.Component {
  collectionName: 'components_products_custom_materials';
  info: {
    displayName: 'CustomMaterials';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface ProductsFlexAndDigitalPrinting extends Schema.Component {
  collectionName: 'components_products_flex_and_digital_printings';
  info: {
    displayName: 'Flexo&DigitalPrinting';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface ProductsMosaic extends Schema.Component {
  collectionName: 'components_products_mosaics';
  info: {
    displayName: 'Mosaic';
  };
  attributes: {
    headline: Attribute.Component<'common.title'>;
    text: Attribute.Text & Attribute.Required;
    image1: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    text2: Attribute.Text;
    image2: Attribute.Media & Attribute.Required;
  };
}

export interface ProductsPackagingDesign extends Schema.Component {
  collectionName: 'components_products_packaging_design';
  info: {
    displayName: 'PackagingDesign';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface ProductsProjects extends Schema.Component {
  collectionName: 'components_products_projects';
  info: {
    displayName: 'Projects';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface ProductsTechSupport extends Schema.Component {
  collectionName: 'components_products_tech_support';
  info: {
    displayName: 'TechSupport';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface SustainabilityCtsPartnership extends Schema.Component {
  collectionName: 'components_sustainability_cts_partnership';
  info: {
    displayName: 'CTSPartnership';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface SustainabilityFscCertificate extends Schema.Component {
  collectionName: 'components_sustainability_fsc_certificates';
  info: {
    displayName: 'FSCCertificate';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface SustainabilityPegadaNeutraPartnership
  extends Schema.Component {
  collectionName: 'components_sustainability_pegada_neutra_partnership';
  info: {
    displayName: 'PegadaNeutraPartnership';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface SustainabilityPolicy extends Schema.Component {
  collectionName: 'components_sustainability_policies';
  info: {
    displayName: 'Policy';
  };
  attributes: {
    headline: Attribute.Component<'common.title'> & Attribute.Required;
    text: Attribute.Text;
    cta: Attribute.Text & Attribute.Required;
    downloadLink: Attribute.Component<'common.link'> & Attribute.Required;
    items: Attribute.Component<'nested.icon-card-short', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 6;
        max: 6;
      }>;
  };
}

export interface SustainabilitySustainabilityPolicy extends Schema.Component {
  collectionName: 'components_sustainability_sustainability_policy';
  info: {
    displayName: 'SustainabilityPolicy';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

export interface SustainabilitySustainableOriginSeal extends Schema.Component {
  collectionName: 'components_sustainability_sustainable_origin_seal';
  info: {
    displayName: 'SustainableOriginSeal';
    description: '';
  };
  attributes: {
    text: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.business-sectors': AboutBusinessSectors;
      'about.our-history': AboutOurHistory;
      'about.principles': AboutPrinciples;
      'about.statistics': AboutStatistics;
      'about.structure': AboutStructure;
      'common.call-to-action': CommonCallToAction;
      'common.image-collection': CommonImageCollection;
      'common.image': CommonImage;
      'common.link-image': CommonLinkImage;
      'common.link': CommonLink;
      'common.title': CommonTitle;
      'home.banner': HomeBanner;
      'home.cases': HomeCases;
      'home.certificates': HomeCertificates;
      'home.service-highlight': HomeServiceHighlight;
      'home.sustainability': HomeSustainability;
      'innovation.ai-supported-design': InnovationAiSupportedDesign;
      'innovation.digital-printing': InnovationDigitalPrinting;
      'innovation.iso-9001-processes': InnovationIso9001Processes;
      'nested.icon-card-short': NestedIconCardShort;
      'nested.icon-card-title': NestedIconCardTitle;
      'nested.icon-card': NestedIconCard;
      'nested.link-card': NestedLinkCard;
      'nested.overline-card': NestedOverlineCard;
      'nested.statistics': NestedStatistics;
      'nested.testimonial-card': NestedTestimonialCard;
      'nested.text-card': NestedTextCard;
      'nested.timeline-item': NestedTimelineItem;
      'people.ethics-and-conduct': PeopleEthicsAndConduct;
      'people.ethics-channel': PeopleEthicsChannel;
      'people.people': PeoplePeople;
      'people.work-with-us': PeopleWorkWithUs;
      'products.2-image-content': Products2ImageContent;
      'products.banner-cta': ProductsBannerCta;
      'products.content': ProductsContent;
      'products.custom-materials': ProductsCustomMaterials;
      'products.flex-and-digital-printing': ProductsFlexAndDigitalPrinting;
      'products.mosaic': ProductsMosaic;
      'products.packaging-design': ProductsPackagingDesign;
      'products.projects': ProductsProjects;
      'products.tech-support': ProductsTechSupport;
      'sustainability.cts-partnership': SustainabilityCtsPartnership;
      'sustainability.fsc-certificate': SustainabilityFscCertificate;
      'sustainability.pegada-neutra-partnership': SustainabilityPegadaNeutraPartnership;
      'sustainability.policy': SustainabilityPolicy;
      'sustainability.sustainability-policy': SustainabilitySustainabilityPolicy;
      'sustainability.sustainable-origin-seal': SustainabilitySustainableOriginSeal;
    }
  }
}
