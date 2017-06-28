<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<div class="products-list">
<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
	?>
	<div class="products-list-item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
		<div class="row">
			<div class="col-md-4 col-sm-4 col-xs-12 products-img">
				<a href="<?=$arItem["DETAIL_PAGE_URL"]?>">
					<img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="">
				</a>
			</div>
			<div class="col-md-8 col-sm-8 col-xs-12 products-text">
				<h4><a href="<?=$arItem["DETAIL_PAGE_URL"]?>"><?echo $arItem["NAME"]?></a></h4>
				<b><?=$arItem["PROPERTIES"]["SHORT_DES"]["VALUE"]?></b><br>
				<?if (isset($arItem["PROPERTIES"]["DETAIL_DES"]["VALUE"]["TEXT"])) {?>
					<a 
						class="btn btn-xs btn-custom" 
						role="button" 
						data-toggle="collapse" 
						href="#collapseExample_<?=$arItem['ID']?>" 
						aria-expanded="false">Подробнее
					</a>
					<div class="collapse" id="collapseExample_<?=$arItem['ID']?>">
						<div class="well">
							<?=$arItem["PROPERTIES"]["DETAIL_DES"]["VALUE"]["TEXT"]?>
					 	</div>
					</div>
				<?}?>
			</div>
		</div>
	</div>
	<?endforeach;?>
</div>