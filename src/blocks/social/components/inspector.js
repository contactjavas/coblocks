/**
 * External dependencies
 */
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, SelectControl, withFallbackStyles } = wp.components;

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps;
	const backgroundColorValue = backgroundColor && backgroundColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColorValue && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackBackgroundColor: backgroundColorValue || ! node ? undefined : getComputedStyle( node ).backgroundColor,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	getHasColorsHelp( checked ) {
		return checked ? __( 'Social button colors are enabled.' ) : __( 'Toggle to use official colors from each social media platform.' );
	}

	render() {

		const {
			className,
			attributes,
			setAttributes,
			setBackgroundColor,
			backgroundColor,
			fallbackBackgroundColor,
		} = this.props;

		const {
			facebook,
			hasColors,
			linkedin,
			pinterest,
			borderRadius,
			tumblr,
			twitter,
			size,
			reddit,
			email,
			iconSize,
		} = attributes;

		const options = [
			{ value: 'sml', label: __( 'Small' ) },
			{ value: 'med', label: __( 'Medium' ) },
			{ value: 'lrg', label: __( 'Large' ) },
		];

		const isMaskStyle = includes( className, 'is-style-mask' );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Social Settings' ) }>
						<ToggleControl
							label={ __( 'Social Colors' ) }
							checked={ !! hasColors }
							onChange={ () => setAttributes( {  hasColors: ! hasColors } ) }
							help={ this.getHasColorsHelp }
						/>
						{ ! isMaskStyle &&
							<RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ borderRadius }
								onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 50 }
							/>
						}
						{ isMaskStyle &&
							<RangeControl
								label={ __( 'Icon Size' ) }
								value={ iconSize }
								onChange={ ( value ) => setAttributes( { iconSize: value } ) }
								min={ 16 }
								max={ 60 }
							/>
						}
						{ ! isMaskStyle &&
							<SelectControl
								label={ __( 'Button Size' ) }
								value={ size }
								options={ options }
								onChange={ ( value ) => setAttributes( { size: value } ) }
								className="components-coblocks-inspector__social-button-size"
							/>
						}
					</PanelBody>
					<PanelBody
						title={ __( 'Icon Settings' ) }
					>
						<p>{ __( ' Toggle the sharing links to display from the following social platforms.' ) }</p>
						<ToggleControl
							label={ __( 'Twitter' ) }
							checked={ !! twitter }
							onChange={ () => setAttributes( {  twitter: ! twitter } ) }
						/>
						<ToggleControl
							label={ __( 'Facebook' ) }
							checked={ !! facebook }
							onChange={ () => setAttributes( {  facebook: ! facebook } ) }
						/>
						<ToggleControl
							label={ __( 'Pinterest' ) }
							checked={ !! pinterest }
							onChange={ () => setAttributes( {  pinterest: ! pinterest } ) }
						/>
						<ToggleControl
							label={ __( 'LinkedIn' ) }
							checked={ !! linkedin }
							onChange={ () => setAttributes( {  linkedin: ! linkedin } ) }
						/>
						<ToggleControl
							label={ __( 'Email' ) }
							checked={ !! email }
							onChange={ () => setAttributes( {  email: ! email } ) }
						/>
						<ToggleControl
							label={ __( 'Tumblr' ) }
							checked={ !! tumblr }
							onChange={ () => setAttributes( {  tumblr: ! tumblr } ) }
						/>
						<ToggleControl
							label={ __( 'Reddit' ) }
							checked={ !! reddit }
							onChange={ () => setAttributes( {  reddit: ! reddit } ) }
						/>
					</PanelBody>
					{ ! hasColors &&
						<PanelColorSettings
							title={ __( 'Color Settings' ) }
							initialOpen={ false }
							colorSettings={ [
								{
									value: backgroundColor.color,
									onChange: setBackgroundColor,
									label: __( 'Background Color' ),
								},
							] }
						>
							<ContrastChecker
								{ ...{
									isLargeText: true,
									textColor: '#fff',
									backgroundColor: backgroundColor.color,
									fallbackBackgroundColor,
								} }
							/>
						</PanelColorSettings>
					}
				</InspectorControls>
			</Fragment>
		);
	}
};

export default compose( [
	applyWithColors,
] )( Inspector );
