<?php require('partials/header.php'); ?>

<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped table-bordered shadow-sm">
                    <thead>
                    <tr class="thead-dark text-center">
                        <th>№</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Report subject</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php $i = 0;
                    foreach ($members as $member) : ?>
                        <tr class="text-center">
                            <td class="align-middle"><?= ++$i ?></td>
                            <?php if ($member['photo'] != null) : ?>
                                <td class="td-photo">
                                    <div class="box">
                                        <img class="profile-img rounded-circle" src="public/images/<?=$member['photo']; ?>">
                                    </div>
                                </td>
                            <?php else : ?>
                                <td class="td-photo">
                                    <div class="box">
                                        <img class="img rounded-circle" src="public/images/default.jpg">
                                    </div>

                                </td>
                            <?php endif; ?>


                            <td class="align-middle mw-30"><?= $member['firstname'] . " " . $member['lastname'] ?></td>
                            <td class="align-middle mw-30"><?= $member['rep_subject'] ?></td>
                            <td class="align-middle mw-20"><a href="<?= 'mailto:' . $member['email']?>"> <?=$member['email']?></a></td>
                        </tr>

                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<?php require('partials/footer.php'); ?>
